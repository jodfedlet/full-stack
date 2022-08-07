exports.up = knex => {
    return Promise.all([
            knex.schema.createTable('transfers', t => {
                t.increments('id').primary();
                t.string('description').notNull();
                t.date('date').notNull();
                t.decimal('amount', 15, 2).notNull();
                t.boolean('status').notNull().default(false);
                t.integer('from_acc_id')
                    .references('id')
                    .inTable('accounts')
                    .notNull();
                t.integer('to_acc_id')
                    .references('id')
                    .inTable('accounts')
                    .notNull();   
                t.integer('user_id')
                    .references('id')
                    .inTable('users')
                    .notNull();         
            }),

            knex.schema.table('transactions', t => {
                t.integer('transfer_id')
                    .references('id')
                    .inTable('transfers');
            }),
    ]);
};

exports.down = knex => {
    return Promise.all([
        knex.schema.table('transactions', (t) => {
            t.dropColumn('transfer_id');
        }),
        knex.schema.dropTable('transfers'),
    ]);
};
