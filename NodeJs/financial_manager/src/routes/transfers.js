const express = require('express');
const BadResources = require('../errors/badResources');

module.exports = app => {

    const router = express.Router();

    router.param('id', (req, res, next) => {
        app.services.transferService.findOne({ id: req.params.id })
        .then(( result ) => {
            if (Number(result.user_id) !== Number(req.user.id)) throw new BadResources();
            next();
        })
       . catch(err => next(err));
    });

    const validate = (req, res, next) => {
        app.services.transferService.validate({ ...req.body, user_id: req.user.id })
        .then(() => next())
        . catch(err => next(err));
    };

    router.get('/', (req, res, next) => {
        app.services.transferService.find({ user_id: req.user.id })
            .then(result => res.status(200).json(result))
            .catch(err => next(err));
    });

    router.post('/', validate, ( req, res, next ) => {
        const transfer = { ...req.body, user_id: req.user.id };
            app.services.transferService.save(transfer)
            .then( result => res.status(201).json(result[0]))
            .catch(err => next(err));
    });

    router.get('/:id', ( req, res, next ) => {
        app.services.transferService.findOne({ id: req.params.id })
            .then(result => res.status(200).json(result ))
           . catch(err => next(err));
    });

    router.put('/:id', validate, ( req, res, next ) => {
        app.services.transferService.update(req.params.id, { ...req.body, user_id: req.user.id })
            .then(result => res.status(200).json(result[0]))
            . catch(err => next(err));
    });

    router.delete('/:id', ( req, res, next ) => {
        app.services.transferService.remove( req.params.id )
            .then(() => res.status(204).send())
            . catch(err => next(err));
    });

    return router;
};
