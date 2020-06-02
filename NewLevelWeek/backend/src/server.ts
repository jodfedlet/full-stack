import express from 'express';

const app = express();

app.get('/users',(request, response)=>{
    console.log('Listagem de usuarios');
    response.json([
        'Jod',
        'Sassoue',
        'John'
    ]);
});

app.listen(3333);