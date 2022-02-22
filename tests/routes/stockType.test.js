'use strict';

const supertest = require('supertest');
const app = require('../../app');
const models = require('../../models');
const Seed = require('../../utils/Seed');

const request = supertest(app);

describe('Stock Types API', () => {
  // Clear db and run migrations
  beforeAll(async () => {
    await models.sequelize
      .sync({ force: true })
      .then(() => new Seed(models.sequelize.getQueryInterface()).run());
  });

  describe('GET /stock-types', () => {
    it('should send 200 status code', async () => {
      const res = await request.get('/stock-types');

      expect(res.statusCode).toEqual(200);
    });

    it('should show all stock types', async () => {
      const res = await request.get('/stock-types');

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
          }),
        ]),
      );
    });
  });

  describe('GET /stock-types/:id', () => {
    it('should send 200 status code', async () => {
      const res = await request.get('/stock-types/1');

      expect(res.statusCode).toEqual(200);
    });

    it('should show one stock type', async () => {
      const res = await request.get('/stock-types/1');

      expect(res.body).toEqual(
        expect.objectContaining({
          name: expect.any(String),
        }),
      );
    });
  });

  describe('POST /stock-types', () => {
    const body = {
      name: 'Test Stock Type',
    };

    it('should send 201 status code', async () => {
      const res = await request.post('/stock-types').send(body);

      expect(res.statusCode).toEqual(201);
    });

    it('should create one stock type', async () => {
      const res = await request.post('/stock-types').send(body);
      const stockType = await models.StockType.findByPk(res.body.id);

      expect(stockType.name).toEqual(body.name);
    });

    it('should send created stock type', async () => {
      const res = await request.post('/stock-types').send(body);

      expect(res.body).toMatchObject(body);
    });
  });

  describe('PUT /stock-types/:id', () => {
    const body = {
      name: 'Update Stock Type',
    };

    // Clear db and run migrations
    beforeEach(async () => {
      await models.sequelize
        .sync({ force: true })
        .then(() => new Seed(models.sequelize.getQueryInterface()).run());
    });

    it('should send 200 status code', async () => {
      const res = await request.put('/stock-types/1').send(body);

      expect(res.statusCode).toEqual(200);
    });

    it('should update one stock type', async () => {
      await request.put('/stock-types/1').send(body);
      const stockType = await models.StockType.findByPk(1);

      expect(stockType.name).toEqual(body.name);
    });

    it('should send confirmation message', async () => {
      const res = await request.put('/stock-types/1').send(body);

      expect(res.body).toHaveProperty('message', 'Modifications was updated');
    });
  });

  describe('DELETE /stock-types/:id', () => {
    // Clear db and run migrations
    beforeEach(async () => {
      await models.sequelize
        .sync({ force: true })
        .then(() => new Seed(models.sequelize.getQueryInterface()).run());
    });

    it('should send 204 status code', async () => {
      const res = await request.delete('/stock-types/1');

      expect(res.statusCode).toEqual(204);
    });

    it('should delete one stock type', async () => {
      await request.delete('/stock-types/1');
      const stockType = await models.StockType.findByPk(1);

      expect(stockType).toBeNull();
    });

    it('should send no content', async () => {
      const res = await request.delete('/stock-types/1');

      expect(res.body).toEqual({});
    });
  });
});
