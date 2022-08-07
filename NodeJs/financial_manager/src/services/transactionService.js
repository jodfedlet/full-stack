const ValidationError = require('../errors/validationError');

const TB_TRANSACTION = 'transactions';

module.exports = app => {

    const findAll = ( userId ) => {
        return app.db(TB_TRANSACTION)
                .join('accounts', 'accounts.id', 'acc_id')
                .where({ user_id: userId })
                .andWhere('acounts.user_id', '=', userId)
                .select();
    };
    const findOne = (filter = {}) => {
        return app.db(TB_TRANSACTION).where(filter).first();
    };

    const find = (userId, filter = {} ) => {
        return app.db(TB_TRANSACTION)
                .join('accounts', 'accounts.id', 'acc_id')
                .where(filter)
                .andWhere('accounts.user_id', '=', userId)
                .select();
    };

    const save = transaction => {
        const newTransaction = { ...transaction };
        if ((transaction.type === 'I' && transaction.amount < 0) || (transaction.type === 'O' && transaction.amount > 0) ) {
            newTransaction.amount *= -1;
        }

        if (!newTransaction.description) throw new ValidationError('Descrição é um atributo obrigatório');
        if (!newTransaction.date) throw new ValidationError('Data é um atributo obrigatório');
        if (!newTransaction.type) throw new ValidationError('Tipo é um atributo obrigatório');
        if (!['I', 'O'].includes(newTransaction.type)) throw new ValidationError('Tipo não é um atributo válido');
        if (!newTransaction.acc_id) throw new ValidationError('Conta é um atributo obrigatório');
        if (!newTransaction.amount || isNaN(newTransaction.amount)) throw new ValidationError('Valor é um atributo obrigatório');
        return app.db(TB_TRANSACTION).insert(newTransaction, '*');
    };

    const update = ( id, transaction ) => {
        return app.db(TB_TRANSACTION).where({ id }).update(transaction, '*');
    };

    const remove = ( id ) => {
        return app.db(TB_TRANSACTION).where({ id }).delete();
    };

    return {
        findAll, save, find, update, remove, findOne,
     };
};
