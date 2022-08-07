const ValidationError = require('../errors/validationError');

const TB_TRANSFERS = 'transfers';

module.exports = app => {

    const findOne = (filter = {}) => {
        return app.db(TB_TRANSFERS).where(filter).first();
    };

    const find = (filter = {} ) => {
        return app.db(TB_TRANSFERS)
                .where(filter)
                .select();
    };

    const validate = async (transfer) => {
        if (!transfer.description) throw new ValidationError('Description é um atributo obrigatório');
        if (!transfer.amount) throw new ValidationError('Amount é um atributo obrigatório');
        if (!transfer.date) throw new ValidationError('Date é um atributo obrigatório');
        if (!transfer.from_acc_id) throw new ValidationError('From acc ID é um atributo obrigatório');
        if (!transfer.to_acc_id) throw new ValidationError('To acc ID é um atributo obrigatório');
        if (transfer.to_acc_id === transfer.from_acc_id) throw new ValidationError('From acc ID e to acc ID devem ser diferentes');
    
        const accounts = await app.db('accounts').whereIn('id', [transfer.from_acc_id, transfer.to_acc_id] );
        accounts.forEach(acc => {
            if (acc.user_id !== parseInt(transfer.user_id, 10)) throw new ValidationError( 'Não é possível transferir para outro usuário');
        });
    };

    const save = async ( transfer ) => {
        const result = await app.db(TB_TRANSFERS).insert(transfer, '*');
        const transferId = result[0].id;
        const transactions = [
            { description: `Transfer to acc #${transfer.to_acc_id}`, date: transfer.date, amount: transfer.amount * -1, type: 'O', acc_id: transfer.from_acc_id, transfer_id: transferId },
            { description: `Transfer from acc #${transfer.from_acc_id}`, date: transfer.date, amount: transfer.amount, type: 'I', acc_id: transfer.to_acc_id, transfer_id: transferId },
        ];

        await app.db('transactions').insert(transactions);
        return result;
    };

    const update = async ( id, transfer ) => {
        const result = await app.db(TB_TRANSFERS).where({ id }).update(transfer, '*');
        const transactions = [
            { description: `Transfer to acc #${transfer.to_acc_id}`, date: transfer.date, amount: transfer.amount * -1, type: 'O', acc_id: transfer.from_acc_id, transfer_id: id },
            { description: `Transfer from acc #${transfer.from_acc_id}`, date: transfer.date, amount: transfer.amount, type: 'I', acc_id: transfer.to_acc_id, transfer_id: id },
        ];

        await app.db('transactions').where({ transfer_id: id }).del();
        await app.db('transactions').insert(transactions);
        return result;
    };

    const remove = async ( id ) => {
        await app.db('transactions').where({ transfer_id: id }).del();
        return app.db(TB_TRANSFERS).where({ id }).del();
    };

    return {
       save, find, update, remove, findOne, validate,
     };
};
