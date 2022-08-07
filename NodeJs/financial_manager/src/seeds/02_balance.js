const moment = require('moment');

exports.seed = knex => {
  return knex('users').insert([
        { id: 50003, name: 'user #3', email: 'user3@gmail.com', password: '$2a$10$WgWaZyOFcZaZlU49/GElpeC/cREi8PACu/JLmMhY0KB7get.I3h6e' },
        { id: 50004, name: 'user #4', email: 'user4@gmail.com', password: '$2a$10$WgWaZyOFcZaZlU49/GElpeC/cREi8PACu/JLmMhY0KB7get.I3h6e' },
        { id: 50005, name: 'user #5', email: 'user5@gmail.com', password: '$2a$10$WgWaZyOFcZaZlU49/GElpeC/cREi8PACu/JLmMhY0KB7get.I3h6e' },
    ], '*')
    .then( (res) => {
        return knex('accounts').insert([
            { id: 50004, name: 'Acc saldo principal', user_id: res[0].id },
            { id: 50005, name: 'Acc secundário', user_id: res[0].id },
            { id: 50006, name: 'Acc alternativo 1', user_id: res[1].id },
            { id: 50007, name: 'Acc alternativo 2', user_id: res[1].id },
            { id: 50008, name: 'Acc Geral 1', user_id: res[2].id },
            { id: 50009, name: 'Acc Geral 2', user_id: res[2].id },
        ]);
    })
    .then( () => knex('transfers').insert([
        { id: 50003, description: 'Transfer #1', user_id: 50000, from_acc_id: 50008, to_acc_id: 50009, amount: 100, date: new Date() },
        { id: 50004, description: 'Transfer #2', user_id: 50004, from_acc_id: 50006, to_acc_id: 50007, amount: 100, date: new Date() },
    ]))
    .then( () => knex('transactions').insert([
        { description: '2', date: new Date(), amount: 2, type: 'I', acc_id: 50008, status: true },
        { description: '4', date: new Date(), amount: 4, type: 'I', acc_id: 50006, status: true },
        { description: '4', date: new Date(), amount: 8, type: 'I', acc_id: 50009, status: true },
        { description: '4', date: moment().subtract({ days: 5 }), amount: 32, type: 'I', acc_id: 50009, status: false },
      ]));
};
