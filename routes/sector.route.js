const { Router } = require('express');
const sector = require('../controllers/sector.controller');

const routes = Router();

routes.get('/', sector.findAll);
routes.get('/:id', sector.findOne);
routes.post('/', sector.create);
routes.put('/:id', sector.update);
routes.delete('/:id', sector.delete);

module.exports = routes;
