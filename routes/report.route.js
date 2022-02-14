const { Router } = require('express');
const report = require('../controllers/report.controller');

const routes = Router();

routes.get('/', report.findAll);
routes.get('/:id', report.findOne);
routes.post('/', report.create);
routes.put('/:id', report.update);
routes.delete('/:id', report.delete);

module.exports = routes;
