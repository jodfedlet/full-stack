exports.seed = knex => {
  return knex('transactions').del()
    .then( () => knex('transfers').del()) 
    .then( () => knex('accounts').del()) 
    .then( () => knex('users').del())
    .then( () => knex('users').insert([
        { id: 50000, name: 'user #1', email: 'user1@gmail.com', password: '$2a$10$WgWaZyOFcZaZlU49/GElpeC/cREi8PACu/JLmMhY0KB7get.I3h6e' },
        { id: 50001, name: 'user #2', email: 'user2@gmail.com', password: '$2a$10$WgWaZyOFcZaZlU49/GElpeC/cREi8PACu/JLmMhY0KB7get.I3h6e' },
    ]))
    .then( () => knex('accounts').insert([
      { id: 50000, name: 'Acc #1', user_id: 50000 },
      { id: 50001, name: 'Acc #2', user_id: 50000 },
      { id: 50002, name: 'Acc #1', user_id: 50001 },
      { id: 50003, name: 'Acc #2', user_id: 50001 },
  ]))
  .then( () => knex('transfers').insert([
    { id: 50000, description: 'Transfer #1', user_id: 50000, from_acc_id: 50000, to_acc_id: 50001, amount: 100, date: new Date() },
    { id: 50001, description: 'Transfer #2', user_id: 50001, from_acc_id: 50002, to_acc_id: 50000, amount: 100, date: new Date() },
]))
.then( () => knex('transactions').insert([
  { description: 'From acc1', date: new Date(), amount: 100, type: 'I', acc_id: 50001, transfer_id: 50000 },
  { description: 'To acc1', date: new Date(), amount: -100, type: 'O', acc_id: 50000, transfer_id: 50001 },
  { description: 'From acc2', date: new Date(), amount: 100, type: 'I', acc_id: 50003, transfer_id: 50001 },
  { description: 'To acc2', date: new Date(), amount: -100, type: 'O', acc_id: 50000, transfer_id: 50001 },
]));
};
