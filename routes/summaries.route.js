const { Router } = require('express');
const summaries = require('../controllers/summaries.controller');

const routes = Router();

routes.get('/', summaries.findAll);

// routes.get('/:id', summaries.findOne);

module.exports = routes;
