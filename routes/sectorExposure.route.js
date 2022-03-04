const { Router } = require('express');
const sectorExposure = require('../controllers/sectorExposure.controller');

const routes = Router();

routes.get('/', sectorExposure.findAll);
routes.get('/:id', sectorExposure.findOne);
routes.post('/', sectorExposure.create);
routes.put('/:id', sectorExposure.update);
routes.delete('/:id', sectorExposure.delete);

module.exports = routes;
