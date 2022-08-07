const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROUTE = '/v1/accounts';
let user;
const secret = 'dsf jk gfd gho gdopugfdigfg';

let user2;

beforeAll( async () => {
    const res = await app.services.userService.save({ name: 'user account', email: `${Date.now()}@gmail.com`, password: '123456' });
    user = { ...res[0] };
    user.token = jwt.encode(user, secret);

    const res2 = await app.services.userService.save({ name: 'user account2', email: `${Date.now()}@gmail.com`, password: '123456' });
    user2 = { ...res2[0] };
});

test('Deve listar somente as contas do usuário', () => {
    return app.db('accounts').insert([
                        { name: 'Acc list #1', user_id: user.id },
                        { name: 'Acc list #2', user_id: user2.id },
                    ] ).then(() => request(app).get(MAIN_ROUTE)
                        .set('authorization', `bearer ${user.token}`)
                        .then( result => {
                            expect(result.status).toBe(200);
                            expect(result.body.length).toBe(1);
                            expect(result.body[0].name).toBe('Acc list #1');
                    }));
});

test('Deve inserir uma conta com sucesso', () => {
    return request(app).post(MAIN_ROUTE)
            .send({ name: 'Acc #1' })
            .set('authorization', `bearer ${user.token}`)
            .then( result => {
                expect(result.status).toBe(201);
                expect(result.body.name).toBe( 'Acc #1');
            });
});

test('Não deve inserir uma conta sem nome', () => {
    return request(app).post(MAIN_ROUTE)
            .send({ })
            .set('authorization', `bearer ${user.token}`)
            .then( result => {
                expect(result.status).toBe(400);
                expect(result.body.error).toBe( 'Nome é um atributo obrigatório');
            });
});

test('Não deve inserir uma conta com nome duplicado para o mesmo usuário', () => {
        return app.db('accounts').insert([
            { name: 'Acc lduplicada', user_id: user.id },
        ] ).then(() => request(app).post(MAIN_ROUTE)
             .send({ name: 'Acc lduplicada' })
            .set('authorization', `bearer ${user.token}`)
            .then( result => {
                expect(result.status).toBe(400);
                expect(result.body.error).toBe('Já existe uma conta com esse nome');
        }));
});

test('Deve retornar uma conta por id', () => {
    return app.db('accounts').insert({ name: 'Acc By id', user_id: user.id }, ['id'])
            .then((acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`).set('authorization', `bearer ${user.token}`)))
            .then( result => {
                expect(result.status).toBe(200);
                expect(result.body.name).toBe('Acc By id');
                expect(result.body.user_id).toBe(user.id);
            });
});

test('Não deve retornar uma conta de outro usuário', () => {
    return app.db('accounts').insert({ name: 'Acc user #2', user_id: user2.id }, ['id'])
            .then( acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`)
                    .set('authorization', `bearer ${user.token}`))
                    .then( result => {
                        expect(result.status).toBe(403);
                        expect(result.body.error).toBe('Este recurso não pertence ao usuário');
                    });
});

test('Deve alterar uma conta', () => {
    return app.db('accounts').insert({ name: 'Acc to update', user_id: user.id }, ['id'])
            .then(acc => {
                return request(app).put(`${MAIN_ROUTE}/${acc[0].id}`).send( { name: 'Acc update' })
                                    .set('authorization', `bearer ${user.token}`);
            } )
            .then( result => {
                expect(result.status).toBe(200);
                expect(result.body.name).toBe( 'Acc update');
            });
});

test('Não deve alterar uma conta de outro usuário', () => {
    return app.db('accounts').insert({ name: 'Acc user #2', user_id: user2.id }, ['id'])
            .then( acc => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
                     .send({ name: 'Acc update' })
                    .set('authorization', `bearer ${user.token}`))
                    .then( result => {
                        expect(result.status).toBe(403);
                        expect(result.body.error).toBe('Este recurso não pertence ao usuário');
                    });
});

test('Deve remover uma conta', () => {
    return app.db('accounts').insert({ name: 'Acc to update', user_id: user.id }, ['id'])
            .then(acc => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`).set('authorization', `bearer ${user.token}`))
            .then( result => {
                expect(result.status).toBe(204);
            });
});

test('Não deve remover uma conta de outro usuário', () => {
    return app.db('accounts').insert({ name: 'Acc user #2', user_id: user2.id }, ['id'])
    .then( acc => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`)
             .send({ name: 'Acc update' })
            .set('authorization', `bearer ${user.token}`))
            .then( result => {
                expect(result.status).toBe(403);
                expect(result.body.error).toBe('Este recurso não pertence ao usuário');
            });
});
