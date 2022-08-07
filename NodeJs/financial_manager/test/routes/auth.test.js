const request = require('supertest');

const app = require('../../src/app');

test('Deve criar o usuário via signup', () => {
    const email = `${Date.now()}@gmail.com`;
    return request(app).post('/auth/signup')
            .send({ name: 'Jod', email, password: '123456' })
            .then(res => {
                expect(res.status).toBe(201);
                expect(res.body.name).toBe('Jod');
                expect(res.body).toHaveProperty('email');
                expect(res.body).not.toHaveProperty('password');
            });
});

test('Deve receber token ao logar', () => {
    const email = `${Date.now()}@gmail.com`;
     return app.services.userService.save({ name: 'Jod', email, password: '123456' })
                .then(() => {
                    return request(app).post('/auth/signin').send({ email, password: '123456' });
                } ).then( res => {
                    expect(res.status).toBe(200);
                    expect(res.body).toHaveProperty('token');
                });
});

test('Não deve autenticar usuário com senha errada', () => {
    const email = `${Date.now()}@gmail.com`;
    return app.services.userService.save({ name: 'Jod', email, password: 'teste' })
               .then(() => {
                    return request(app).post('/auth/signin').send({ email, password: 'tete' });
               }).then( res => {
                    expect(res.status).toBe(400);
                    expect(res.body.error).toBe('Usuário ou senha incorretos');
               });
});

test('Não deve autenticar com usurio inexistente', () => {
    return request(app).post('/auth/signin')
                    .send({ email: 'johdoe@gmail.com', password: 'tete' })
                    .then( res => {
                            expect(res.status).toBe(400);
                            expect(res.body.error).toBe('Usuário ou senha incorretos');
                    });
});

test('Não deve acessar uma rota protegida sem token', () => {
    return request(app).get('/v1/users')
                    .then( res => {
                            expect(res.status).toBe(401);
                    });
});
