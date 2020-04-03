const express = require('express');
const OngContoller = require('./contollers/OngController');
const IncidentContoller = require('./contollers/IncidentController');
const ProfileContoller = require('./contollers/ProfileContoller');
const SessionController = require('./contollers/SessionController');

const routes = express.Router();

routes.get('/sessions', SessionController.index);

routes.get('/ongs', OngContoller.index);
routes.post('/ongs', OngContoller.create);

routes.get('/profile', ProfileContoller.index);

routes.get('/incidents', IncidentContoller.index);
routes.post('/incidents', IncidentContoller.create);
routes.delete('/incidents/:id', IncidentContoller.delete);
module.exports = routes;