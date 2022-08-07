const express = require('express');
const BadResources = require('../errors/badResources');

module.exports = app => {

    const router = express.Router();

    router.param('id', (req, res, next) => {
        app.services.accountService.find({ id: req.params.id })
        .then(result => {
            if (result.user_id !== req.user.id) {
               throw new BadResources();
            }
            next();
        })
       . catch(err => next(err));
    });

    router.get('/', (req, res, next) => {
        app.services.accountService.findAll(req.user.id)
            .then(users => res.status(200).json(users))
            .catch(err => next(err));
    });

    router.post('/', ( req, res, next ) => {
            app.services.accountService.save({ ...req.body, user_id: req.user.id })
            .then( result => res.status(201).json(result[0]))
            .catch(err => next(err));
    });

    router.get('/:id', ( req, res, next ) => {
        app.services.accountService.find({ id: req.params.id })
            .then(result => res.status(200).json(result ))
           . catch(err => next(err));
    });

    router.put('/:id', ( req, res, next ) => {
        app.services.accountService.update(req.params.id, req.body)
            .then(result => res.status(200).json(result[0]))
            . catch(err => next(err));
    });

    router.delete('/:id', ( req, res, next ) => {
        app.services.accountService.remove( req.params.id )
            .then(() => res.status(204).send())
            . catch(err => next(err));
    });

    return router;
};
