const request = require('supertest');
const jwt = require('jwt-simple');

const app = require('../../src/app');

const MAIN_ROUTE = '/v1/transactions';

let user;
let user2;
let accUser1;
let accUser2;
const secret = 'dsf jk gfd gho gdopugfdigfg';

beforeAll( async () => {
    await app.db('transactions').del();
    await app.db('accounts').del();
    await app.db('users').del();

   const users = await app.db('users').insert([
        { name: 'user #1', email: 'user1@gmail.com', password: '$2a$10$WgWaZyOFcZaZlU49/GElpeC/cREi8PACu/JLmMhY0KB7get.I3h6e' },
        { name: 'user #2', email: 'user2@gmail.com', password: '$2a$10$WgWaZyOFcZaZlU49/GElpeC/cREi8PACu/JLmMhY0KB7get.I3h6e' },
    ], '*');

    [user, user2] = users;
    delete user.password;

    user.token = jwt.encode(user, secret);
    const accs = await app.db('accounts').insert([
        { name: 'Acc #1', user_id: user.id },
        { name: 'Acc #2', user_id: user2.id },
    ], '*');

    [accUser1, accUser2] = accs;
});

test('Deve listar apenas as transações do usuário', () => {
    return app.db('transactions').insert([
        { description: 'T1', date: new Date(), amount: 100, type: 'I', acc_id: accUser1.id },
        { description: 'T2', date: new Date(), amount: 360, type: 'O', acc_id: accUser2.id },
    ]).then(() => request(app).get(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .then(res => {
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].description).toBe('T1');
        }));
});

test('Deve inserir uma transação com sucesso', () => {
    return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .send({ description: 'new T', date: new Date(), amount: 150.00, type: 'I', acc_id: accUser1.id })
        .then( res => {
             expect(res.status).toBe(201);
              expect(res.body.acc_id).toBe(accUser1.id);
               expect(res.body.amount).toBe('150.00');
    });
});

test('Transações de entrada devem ser positivas', () => {
    return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .send({ description: 'new T', date: new Date(), amount: -150, type: 'I', acc_id: accUser1.id })
        .then( res => {
             expect(res.status).toBe(201);
              expect(res.body.acc_id).toBe(accUser1.id);
               expect(res.body.amount).toBe('150.00');
    });
});

test('Transações de saída devem ser negativas', () => {
    return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .send({ description: 'new T', date: new Date(), amount: 150, type: 'O', acc_id: accUser1.id })
        .then( res => {
             expect(res.status).toBe(201);
              expect(res.body.acc_id).toBe(accUser1.id);
               expect(res.body.amount).toBe('-150.00');
    });
});

test('Não deve inserir transacao sem descricao', () => {
    return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .send({ date: new Date(), amount: 150, type: 'O', acc_id: accUser1.id })
        .then( res => {
             expect(res.status).toBe(400);
             expect(res.body.error).toBe('Descrição é um atributo obrigatório');
    });
});

test('Não deve inserir transacao sem valor', () => {
    return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .send({ description: 'new T', date: new Date(), type: 'O', acc_id: accUser1.id })
        .then( res => {
             expect(res.status).toBe(400);
             expect(res.body.error).toBe('Valor é um atributo obrigatório');
    });
});

test('Não deve inserir transacao sem data', () => {
    return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .send({ description: 'new T', amount: 150, type: 'O', acc_id: accUser1.id })
        .then( res => {
             expect(res.status).toBe(400);
             expect(res.body.error).toBe('Data é um atributo obrigatório');
    });
});

test('Não deve inserir transacao sem conta', () => {
    return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .send({ description: 'new T', date: new Date(), amount: 150, type: 'O' })
        .then( res => {
             expect(res.status).toBe(400);
             expect(res.body.error).toBe('Conta é um atributo obrigatório');
    });
});

test('Não deve inserir transacao sem tipo', () => {
    return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .send({ description: 'new T', date: new Date(), amount: 150, acc_id: accUser1.id })
        .then( res => {
             expect(res.status).toBe(400);
             expect(res.body.error).toBe('Tipo é um atributo obrigatório');
    });
});

test('Não deve inserir transacao com tipo inválido', () => {
    return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${user.token}`)
        .send({ description: 'new T', date: new Date(), amount: 150, type: 'A', acc_id: accUser1.id })
        .then( res => {
             expect(res.status).toBe(400);
             expect(res.body.error).toBe('Tipo não é um atributo válido');
    });
});

test('Deve retornar uma transação por id', () => {
    return app.db('transactions').insert({ description: 'T by id', date: new Date(), amount: 150, type: 'I', acc_id: accUser1.id }, ['id'] )
    .then(result => request(app).get(`${MAIN_ROUTE}/${result[0].id}`)
        .set('authorization', `bearer ${user.token}`)
        .then( res => {
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(result[0].id);
           expect(res.body.description).toBe('T by id');
    }));
});

test('Deve alterar uma transação', () => {
    return app.db('transactions').insert({ description: 'T update', date: new Date(), amount: 150, type: 'I', acc_id: accUser1.id }, ['id'] )
    .then(result => request(app).put(`${MAIN_ROUTE}/${result[0].id}`)
        .set('authorization', `bearer ${user.token}`)
        .send({ description: 'updated' })
        .then( res => {
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(result[0].id);
           expect(res.body.description).toBe( 'updated');
    }));
});

test('Deve remover uma transação', () => {
    return app.db('transactions').insert({ description: 'T by id', date: new Date(), amount: 150, type: 'I', acc_id: accUser1.id }, ['id'] )
    .then(result => request(app).delete(`${MAIN_ROUTE}/${result[0].id}`)
        .set('authorization', `bearer ${user.token}`)
        .then( res => {
            expect(res.status).toBe(204);
    }));
});

test('Não deve remover uma transação de outro usuário', () => {
    return app.db('transactions').insert({ description: 'T by id', date: new Date(), amount: 150, type: 'I', acc_id: accUser2.id }, ['id'] )
    .then(result => request(app).delete(`${MAIN_ROUTE}/${result[0].id}`)
        .set('authorization', `bearer ${user.token}`)
        .then( res => {
            expect(res.status).toBe(403);
            expect(res.body.error).toBe('Este recurso não pertence ao usuário');
    }));
});

test('Não deve remover conta com transação', () => {
    return app.db('transactions').insert({ description: 'T by id', date: new Date(), amount: 150, type: 'I', acc_id: accUser1.id }, ['id'] )
    .then(() => request(app).delete(`/v1/accounts/${accUser1.id}`)
        .set('authorization', `bearer ${user.token}`)
        .then( res => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Essa conta possui transação relacionada');
    }));
});
