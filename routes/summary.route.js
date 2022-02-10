const { Router } = require('express');
const summary = require('../controllers/summary.controller');

const routes = Router();

routes.get('/', summary.findAll);
routes.get('/:id', summary.findOne);
routes.post('/', summary.create);
routes.put('/:id', summary.update);
routes.delete('/:id', summary.delete);

module.exports = routes;
