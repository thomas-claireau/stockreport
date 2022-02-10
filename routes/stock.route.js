const { Router } = require('express');
const stock = require('../controllers/stock.controller');

const routes = Router();

routes.get('/', stock.findAll);
routes.get('/:id', stock.findOne);
routes.post('/', stock.create);
routes.put('/:id', stock.update);
routes.delete('/:id', stock.delete);

module.exports = routes;
