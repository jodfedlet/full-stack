const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        app.services.userService.findAll()
                                 .then(users => res.status(200).json(users))
                                 . catch(err => next(err));
    });

    router.post('/', async (req, res, next) => {
        try {
            const result = await app.services.userService.save(req.body);
            return res.status(201).json(result[0]);
        } catch (err) {
           return next(err);
        }
    });

    return router;
};
