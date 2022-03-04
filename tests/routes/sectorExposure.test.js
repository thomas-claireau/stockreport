'use strict';

const supertest = require('supertest');
const app = require('../../app');
const models = require('../../models');
const Seed = require('../../utils/Seed');

const request = supertest(app);

describe('SectorExposures API', () => {
  // Clear db and run migrations
  beforeAll(async () => {
    await models.sequelize
      .sync({ force: true })
      .then(() => new Seed(models.sequelize.getQueryInterface()).run());
  });

  describe('GET /sector-exposures', () => {
    it('should send 200 status code', async () => {
      const res = await request.get('/sector-exposures');

      expect(res.statusCode).toEqual(200);
    });

    it('should show all sectorExposures', async () => {
      const res = await request.get('/sector-exposures');

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            percent: expect.any(Number),
            StockId: expect.any(Number),
            SectorId: expect.any(Number),
          }),
        ]),
      );
    });
  });

  describe('GET /sector-exposures/:id', () => {
    it('should send 200 status code', async () => {
      const res = await request.get('/sector-exposures/1');

      expect(res.statusCode).toEqual(200);
    });

    it('should show one sector', async () => {
      const res = await request.get('/sector-exposures/1');

      expect(res.body).toEqual(
        expect.objectContaining({
          percent: expect.any(Number),
          StockId: expect.any(Number),
          SectorId: expect.any(Number),
        }),
      );
    });
  });

  describe('POST /sector-exposures', () => {
    const body = {
      percent: 34,
      StockId: 1,
      SectorId: 1,
    };

    it('should send 201 status code', async () => {
      const res = await request.post('/sector-exposures').send(body);

      expect(res.statusCode).toEqual(201);
    });

    it('should create one sector', async () => {
      const res = await request.post('/sector-exposures').send(body);
      const stockType = await models.SectorExposure.findByPk(res.body.id);

      expect(stockType.name).toEqual(body.name);
    });

    it('should send created sector', async () => {
      const res = await request.post('/sector-exposures').send(body);

      expect(res.body).toMatchObject(body);
    });
  });

  describe('PUT /sector-exposures/:id', () => {
    const body = {
      percent: 34,
      StockId: 1,
      SectorId: 1,
    };

    // Clear db and run migrations
    beforeEach(async () => {
      await models.sequelize
        .sync({ force: true })
        .then(() => new Seed(models.sequelize.getQueryInterface()).run());
    });

    it('should send 200 status code', async () => {
      const res = await request.put('/sector-exposures/1').send(body);

      expect(res.statusCode).toEqual(200);
    });

    it('should update one sector', async () => {
      await request.put('/sector-exposures/1').send(body);
      const stockType = await models.SectorExposure.findByPk(1);

      expect(stockType.name).toEqual(body.name);
    });

    it('should send confirmation message', async () => {
      const res = await request.put('/sector-exposures/1').send(body);

      expect(res.body).toHaveProperty('message', 'Modifications was updated');
    });
  });

  describe('DELETE /sector-exposures/:id', () => {
    // Clear db and run migrations
    beforeEach(async () => {
      await models.sequelize
        .sync({ force: true })
        .then(() => new Seed(models.sequelize.getQueryInterface()).run());
    });

    it('should send 204 status code', async () => {
      const res = await request.delete('/sector-exposures/1');

      expect(res.statusCode).toEqual(204);
    });

    it('should delete one sector', async () => {
      await request.delete('/sector-exposures/1');
      const stockType = await models.SectorExposure.findByPk(1);

      expect(stockType).toBeNull();
    });

    it('should send no content', async () => {
      const res = await request.delete('/sector-exposures/1');

      expect(res.body).toEqual({});
    });
  });
});
