const { Router } = require('express');
const summary = require('../controllers/summary.controller');

const routes = Router();

routes.get('/', summary.findAll);

routes.get('/:id', summary.findOne);

module.exports = routes;
