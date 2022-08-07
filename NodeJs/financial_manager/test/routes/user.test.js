const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const email = `${Date.now()}@gmail.com`;

const MAIN_ROUTE = '/v1/users';

let user;
const secret = 'dsf jk gfd gho gdopugfdigfg';

beforeAll( async () => {
    const res = await app.services.userService.save({ name: 'user account', email: `${Date.now()}@gmail.com`, password: '123456' });
    user = { ...res[0] };
    user.token = jwt.encode(user, secret);
 });

test('Deve listar todos os usuarios', () => {
    return request(app).get(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
});

test('Deve inserir o usuario com sucesso', () => {
    return request(app).post(MAIN_ROUTE)
            .send({ name: 'Jod', email, password: '123456' })
            .set('authorization', `bearer ${user.token}`)
            .then(res => {
                expect(res.status).toBe(201);
                expect(res.body.name).toBe('Jod');
                expect(res.body).not.toHaveProperty('password');
            });
});

test('Deve armazenar senhar criptografada', async () => {
    const res = await request(app).post(MAIN_ROUTE)
                                 .send({ name: 'Jod F P', email: `${Date.now()}@gmail.com`, password: '123456' })
                                 .set('authorization', `bearer ${user.token}`);
        expect(res.status).toBe(201);

        const { id } = res.body;
        const usersDb = await app.services.userService.findOne( { id });
        expect(usersDb.password).not.toBeUndefined();
        expect(usersDb.password).not.toBe('123456');
});

test('Não deve inserir usário sem nome', () => {
    return request(app).post(MAIN_ROUTE)
                .send({ email: 'Teste@gmail.com', password: '123456' })
                .set('authorization', `bearer ${user.token}`)
                .then( res => {
                    expect(res.status).toBe(400);
                    expect(res.body.error).toBe('Nome é um atributo obrigatório');
                });
});

test('Não deve inserir usário sem email', async () => {
    const result = await request(app).post(MAIN_ROUTE)
                .send({ name: 'Jod', password: '123456' })
                .set('authorization', `bearer ${user.token}`);
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Email é um atributo obrigatório');
});

test('Não deve inserir usário sem senha', async () => {
    const result = await request(app).post(MAIN_ROUTE)
                .send({ name: 'Jod', email: 'teste@gmail.com' })
                .set('authorization', `bearer ${user.token}`);
    expect(result.status).toBe(400);
    expect(result.body.error).toBe('Password é um atributo obrigatório');
});

test('Não deve inserir usário com email existente', () => {
    return request(app).post(MAIN_ROUTE)
            .send({ name: 'Jod', email, password: '123456' })
            .set('authorization', `bearer ${user.token}`)
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe('Já existe um usuário com esse email');
            });
});
