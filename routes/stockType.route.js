const { Router } = require('express');
const stockType = require('../controllers/stockType.controller');

const routes = Router();

routes.get('/', stockType.findAll);
routes.get('/:id', stockType.findOne);
routes.post('/', stockType.create);
routes.put('/:id', stockType.update);
routes.delete('/:id', stockType.delete);

module.exports = routes;
