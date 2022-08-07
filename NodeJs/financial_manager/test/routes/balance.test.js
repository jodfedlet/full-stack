const request = require('supertest');
const moment = require('moment');

const app = require('../../src/app');

const MAIN_ROUTE = '/v1/balance';
const TRANSACTION_ROUTE = '/v1/transactions';
const TRANSFERS_ROUTE = '/v1/transfers';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMDAzIiwibmFtZSI6InVzZXIgIzMiLCJlbWFpbCI6InVzZXIzQGdtYWlsLmNvbSJ9.dgFSRWOsGxU5tNkJjM5k4myLOpd59xQidEAmWBcN43s';

beforeAll( async () => {
    await app.db.seed.run();
});

describe('Ao calcular o saldo usuário ...', () => {
    test('Deve retornar apenas as contas com alguma transação', () => {
        return request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .then( res => {
             expect(res.status).toBe(200);
              expect(res.body).toHaveLength(0);
        });
    });

    test('Deve adicionar valores de entrada', () => {
        return request(app).post(TRANSACTION_ROUTE)
        .send({ description: '1', date: new Date(), amount: 100, type: 'I', acc_id: 50004, status: true })
        .set('authorization', `bearer ${TOKEN}`)
        .then( () => {
            return request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .then( res => {
             expect(res.status).toBe(200);
              expect(res.body).toHaveLength(1);
              expect(res.body[0].id).toBe(50004);
              expect(res.body[0].sum).toBe('100.00');

        });
    });
    });

    test('Deve substrair valores de saída', () => {
        return request(app).post(TRANSACTION_ROUTE)
        .send({ description: '1', date: new Date(), amount: 200, type: 'O', acc_id: 50004, status: true })
        .set('authorization', `bearer ${TOKEN}`)
        .then( () => {
            return request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .then( res => {
             expect(res.status).toBe(200);
              expect(res.body).toHaveLength(1);
              expect(res.body[0].id).toBe(50004);
              expect(res.body[0].sum).toBe('-100.00');

        });
    });
    });

    test('Não deve considerar transações pendentes', () => {
        return request(app).post(TRANSACTION_ROUTE)
        .send({ description: '1', date: new Date(), amount: 200, type: 'I', acc_id: 50004, status: false })
        .set('authorization', `bearer ${TOKEN}`)
        .then( () => {
            return request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .then( res => {
             expect(res.status).toBe(200);
              expect(res.body).toHaveLength(1);
              expect(res.body[0].id).toBe(50004);
              expect(res.body[0].sum).toBe('-100.00');

        });
    });
    });

    test('Não deve considerar saldo de contas distintas', () => {
        return request(app).post(TRANSACTION_ROUTE)
        .send({ description: '1', date: new Date(), amount: 50, type: 'I', acc_id: 50005, status: true })
        .set('authorization', `bearer ${TOKEN}`)
        .then( () => {
            return request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .then( res => {
             expect(res.status).toBe(200);
              expect(res.body).toHaveLength(2);
              expect(res.body[0].id).toBe(50004);
              expect(res.body[0].sum).toBe('-100.00');
              expect(res.body[1].id).toBe(50005);
              expect(res.body[1].sum).toBe('50.00');

        });
    });
    });

    test('Não deve considerar contas de outros usuários', () => {
        return request(app).post(TRANSACTION_ROUTE)
        .send({ description: '1', date: new Date(), amount: 200, type: 'O', acc_id: 50005, status: true })
        .set('authorization', `bearer ${TOKEN}`)
        .then( () => {
            return request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .then( res => {
                expect(res.body).toHaveLength(2);
                expect(res.body[0].id).toBe(50004);
                expect(res.body[0].sum).toBe('-100.00');
                expect(res.body[1].id).toBe(50005);
                expect(res.body[1].sum).toBe('-150.00');
        });
    });
    });

    test('Deve considerar transação passada', () => {
        return request(app).post(TRANSACTION_ROUTE)
        .send({ description: '1', date: moment().subtract({ days: 5 }), amount: 250, type: 'I', acc_id: 50005, status: true })
        .set('authorization', `bearer ${TOKEN}`)
        .then( () => {
            return request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .then( res => {
             expect(res.status).toBe(200);
              expect(res.body).toHaveLength(2);
              expect(res.body[0].id).toBe(50004);
              expect(res.body[0].sum).toBe('-100.00');
              expect(res.body[1].id).toBe(50005);
              expect(res.body[1].sum).toBe('100.00');

        });
    });
    });

    test('Não deve considerar transação futura', () => {
        return request(app).post(TRANSACTION_ROUTE)
        .send({ description: '1', date: moment().add({ days: 5 }), amount: 250, type: 'I', acc_id: 50005, status: true })
        .set('authorization', `bearer ${TOKEN}`)
        .then( () => {
            return request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .then( res => {
             expect(res.status).toBe(200);
              expect(res.body).toHaveLength(2);
              expect(res.body[0].id).toBe(50004);
              expect(res.body[0].sum).toBe('-100.00');
              expect(res.body[1].id).toBe(50005);
              expect(res.body[1].sum).toBe('100.00');

        });
    });
    });

    test('Deve considerar transferências', () => {
        return request(app).post(TRANSFERS_ROUTE)
        .send({ description: '1', amount: 250, from_acc_id: 50004, to_acc_id: 50005, date: new Date() })
        .set('authorization', `bearer ${TOKEN}`)
        .then( () => {
            return request(app).get(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .then( res => {
             expect(res.status).toBe(200);
              expect(res.body).toHaveLength(2);
              expect(res.body[0].id).toBe(50004);
              expect(res.body[0].sum).toBe('-100.00');
              expect(res.body[1].id).toBe(50005);
              expect(res.body[1].sum).toBe('100.00');

        });
    });
    });
});
