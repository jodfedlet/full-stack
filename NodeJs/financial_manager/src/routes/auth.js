const jwt = require('jwt-simple');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/validationError');

const secret = 'dsf jk gfd gho gdopugfdigfg';

module.exports = app => {
    const router = express.Router();
    router.post('/signin', ( req, res, next ) => {
       app.services.userService.findOne({ email: req.body.email })
                .then( user => {
                    if (!user) throw new ValidationError('Usuário ou senha incorretos');
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                        };

                       const token = jwt.encode(payload, secret);
                       res.status(200).json({ token });
                    } else throw new ValidationError('Usuário ou senha incorretos');
                } ).catch(err => next(err));
    });

    router.post('/signup', async ( req, res, next ) => {
        try {
            const result = await app.services.userService.save(req.body);
            return res.status(201).json(result[0]);
        } catch (err) {
           return next(err);
        }
     });
    return router;
};
