const { Router } = require('express');
const movementType = require('../controllers/movementType.controller');

const routes = Router();

routes.get('/', movementType.findAll);
routes.get('/:id', movementType.findOne);
routes.post('/', movementType.create);
routes.put('/:id', movementType.update);
routes.delete('/:id', movementType.delete);

module.exports = routes;
