const request = require('supertest');

const app = require('../../src/app');

const MAIN_ROUTE = '/v1/transfers';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMDAwIiwibmFtZSI6InVzZXIgIzEiLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSJ9.rwF36DHa7lwukDuhIeyMyqTZhwPTcLlm3wGBUd0Yf4w';

beforeAll( async () => {
   // await app.db.migrate.rollback();
   // await app.db.migrate.latest();
    await app.db.seed.run();
});

test('Deve listar apenas as transferências do usuário', () => {
    return request(app).get(MAIN_ROUTE)
        .set('authorization', `bearer ${TOKEN}`)
        .then( res => {
             expect(res.status).toBe(200);
              expect(res.body).toHaveLength(1);
              expect(res.body[0].description).toBe('Transfer #1');
    });
});

test('Deve inserir uma transferência com sucesso', () => {
    return request(app).post(MAIN_ROUTE)
        .set('authorization', `bearer ${TOKEN}`)
        .send({ description: 'Regular transfer', user_id: 50000, from_acc_id: 50000, to_acc_id: 50001, amount: 100, date: new Date() })
        .then( async ( res ) => {
            expect(res.status).toBe(201);
            expect(res.body.description).toBe('Regular transfer');

            const transactions = await app.db('transactions').where( { transfer_id: res.body.id });
            expect(transactions).toHaveLength(2);
            expect(transactions[0].description).toBe('Transfer to acc #50001');
            expect(transactions[1].description).toBe('Transfer from acc #50000');
            expect(transactions[0].amount).toBe('-100.00');
            expect(transactions[1].amount).toBe('100.00');
            expect(transactions[0].acc_id).toBe(50000);
            expect(transactions[1].acc_id).toBe(50001);
    });
});

describe('Ao salvar uma transferência válida', () => {
    let transferId;
    let income;
    let outcome;
    test('Deve retornar o status 201 e os dados da transferência', () => {
        return request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .send({ description: 'Regular transfer', user_id: 50000, from_acc_id: 50000, to_acc_id: 50001, amount: 100, date: new Date() })
            .then( async ( res ) => {
                expect(res.status).toBe(201);
                expect(res.body.description).toBe('Regular transfer');
                transferId = res.body.id;
        });
    });

    test('Deve gerar as transações equivalentes', async () => {
        const transactions = await app.db('transactions').where({ transfer_id: transferId }).orderBy('amount');
        expect(transactions).toHaveLength(2);
        [outcome, income] = transactions;
    });

    test('A transação de saída deve ser negativa', () => {
        expect(outcome.description).toBe('Transfer to acc #50001');
        expect(outcome.amount).toBe('-100.00');
        expect(outcome.acc_id).toBe(50000);
        expect(outcome.type).toBe('O');
    });

    test('A transação de entrada deve ser positiva', () => {
        expect(income.description).toBe('Transfer from acc #50000');
        expect(income.amount).toBe('100.00');
        expect(income.acc_id).toBe(50001);
        expect(income.type).toBe('I');
    });

    test('Ambas devem referenciar a transferência que as originou ', () => {
        expect(outcome.transfer_id).toBe(transferId);
        expect(income.transfer_id).toBe(transferId);
    });
});

describe('Ao salvar uma transferência inválida', () => {
 
    test('Não deve inserir sem descrição', () => {
        return request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .send({ user_id: 50000, from_acc_id: 50000, to_acc_id: 50001, amount: 100, date: new Date() })
            .then( res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe( 'Description é um atributo obrigatório');
        });
    });

    test('Não deve inserir sem valor', () => {
        return request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .send({ description: 'Regular transfer', user_id: 50000, from_acc_id: 50000, to_acc_id: 50001, date: new Date() })
            .then( res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe( 'Amount é um atributo obrigatório');
        });
    });

    test('Não deve inserir sem data', () => {
        return request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .send({ description: 'Regular transfer', user_id: 50000, from_acc_id: 50000, amount: 100, to_acc_id: 50001 })
            .then( res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe( 'Date é um atributo obrigatório');
        });
    });

    test('Não deve inserir sem conta de origem', () => {
        return request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .send({ description: 'Regular transfer', user_id: 50000, amount: 100, to_acc_id: 50001, date: new Date() })
            .then( res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe( 'From acc ID é um atributo obrigatório');
        });
    });

    test('Não deve inserir sem conta de destino', () => {
        return request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .send({ description: 'Regular transfer', user_id: 50000, from_acc_id: 50000, amount: 100, date: new Date() })
            .then( res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe( 'To acc ID é um atributo obrigatório');
        });
    });

    test('Não deve inserir se as contas forem iguais', () => {
        return request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .send({ description: 'Regular transfer', user_id: 50000, from_acc_id: 50000, to_acc_id: 50000, amount: 100, date: new Date() })
            .then( res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe( 'From acc ID e to acc ID devem ser diferentes');
        });
    });

    test('Não deve inserir se as contas forem de outro usuário', () => {
        return request(app).post(MAIN_ROUTE)
            .set('authorization', `bearer ${TOKEN}`)
            .send({ description: 'Regular transfer', user_id: 50000, from_acc_id: 50002, to_acc_id: 50001, amount: 100, date: new Date() })
            .then( res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe( 'Não é possível transferir para outro usuário');
        });
    });
});

test('Deve retornar uma transferência por id', () => {
    return request(app).get(`${MAIN_ROUTE}/50000`)
        .set('authorization', `bearer ${TOKEN}`)
        .then( res => {
             expect(res.status).toBe(200);
              expect(res.body.description).toBe('Transfer #1');
    });
});

describe('Ao alterar uma transferência válida', () => {
    let transferId;
    let income;
    let outcome;
    test('Deve retornar o status 200 e os dados da transferência', () => {
        return request(app).put(`${MAIN_ROUTE}/50000`)
            .set('authorization', `bearer ${TOKEN}`)
            .send({ description: 'Regular updated', user_id: 50000, from_acc_id: 50000, to_acc_id: 50001, amount: 150, date: new Date() })
            .then( async ( res ) => {
                expect(res.status).toBe(200);
                expect(res.body.description).toBe('Regular updated');
                expect(res.body.amount).toBe('150.00');
                transferId = res.body.id;
        });
    });

    test('Deve gerar as transações equivalentes', async () => {
        const transactions = await app.db('transactions').where({ transfer_id: transferId }).orderBy('amount');
        expect(transactions).toHaveLength(2);
        [outcome, income] = transactions;
    });
    
    test('A transação de saída deve ser negativa', () => {
        expect(outcome.description).toBe('Transfer to acc #50001');
        expect(outcome.amount).toBe('-150.00');
        expect(outcome.acc_id).toBe(50000);
        expect(outcome.type).toBe('O');
    });

    test('A transação de entrada deve ser positiva', () => {
        expect(income.description).toBe('Transfer from acc #50000');
        expect(income.amount).toBe('150.00');
        expect(income.acc_id).toBe(50001);
        expect(income.type).toBe('I');
    });

    test('Ambas devem referenciar a transferência que as originou ', () => {
        expect(outcome.transfer_id).toBe(transferId);
        expect(income.transfer_id).toBe(transferId);
    });
});

describe('Ao remover uma transferência', () => {
    test('Deve retornar o status 204', () => {
        return request(app).delete(`${MAIN_ROUTE}/50000`)
            .set('authorization', `bearer ${TOKEN}`)
            .then( res => {
              expect(res.status).toBe(204);
        });
    });

    test('O registro deve ter sido removido do banco', () => {
        return app.db('transfers').where({ id: 50000 })
                .then(result => {
                    expect(result).toHaveLength(0);
                });
    });

    test('As transações associadas devem ter sido removidos', () => {
        return app.db('transactions').where({ transfer_id: 50000 })
        .then(result => {
            expect(result).toHaveLength(0);
        });
    });
});

test('Não deve retornar transferência de outro usuário', () => {
    return request(app).get(`${MAIN_ROUTE}/50001`)
        .set('authorization', `bearer ${TOKEN}`)
        .then( res => {
         expect(res.status).toBe(403);
         expect(res.body.error).toBe('Este recurso não pertence ao usuário');
    });
});
