const ValidationError = require('../errors/validationError');

module.exports = app => {

    const findAll = ( userId ) => {
        return app.db('accounts').where({ user_id: userId });
    };

    const find = ( filter = {} ) => {
        return app.db('accounts').where(filter).first();
    };

    const save = async account => {
        if (!account.name) {
            throw new ValidationError( 'Nome é um atributo obrigatório' );
        }

        const accDb = await find({ name: account.name, user_id: account.user_id });
        if (accDb) {
            throw new ValidationError('Já existe uma conta com esse nome' );
        }
        return app.db('accounts').insert(account, '*');
    };

    const update = ( id, account ) => {
        return app.db('accounts').where({ id }).update(account, '*');
    };

    const remove = async ( id ) => {
        const transaction = await app.services.transactionService.findOne({ acc_id: id });
        if (transaction) throw new ValidationError('Essa conta possui transação relacionada');
        return app.db('accounts').where({ id }).delete();
    };

    return {
        findAll, save, find, update, remove,
     };
};