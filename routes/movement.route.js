const { Router } = require('express');
const movement = require('../controllers/movement.controller');

const routes = Router();

routes.get('/', movement.findAll);
routes.get('/:id', movement.findOne);
routes.post('/', movement.create);
routes.put('/:id', movement.update);
routes.delete('/:id', movement.delete);

module.exports = routes;
