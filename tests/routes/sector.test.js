'use strict';

const supertest = require('supertest');
const app = require('../../app');
const models = require('../../models');
const Seed = require('../../utils/Seed');

const request = supertest(app);

describe('Sectors API', () => {
  // Clear db and run migrations
  beforeAll(async () => {
    await models.sequelize
      .sync({ force: true })
      .then(() => new Seed(models.sequelize.getQueryInterface()).run());
  });

  describe('GET /sectors', () => {
    it('should send 200 status code', async () => {
      const res = await request.get('/sectors');

      expect(res.statusCode).toEqual(200);
    });

    it('should show all sectors', async () => {
      const res = await request.get('/sectors');

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
          }),
        ]),
      );
    });
  });

  describe('GET /sectors/:id', () => {
    it('should send 200 status code', async () => {
      const res = await request.get('/sectors/1');

      expect(res.statusCode).toEqual(200);
    });

    it('should show one sector', async () => {
      const res = await request.get('/sectors/1');

      expect(res.body).toEqual(
        expect.objectContaining({
          name: expect.any(String),
        }),
      );
    });
  });

  describe('POST /sectors', () => {
    const body = {
      name: 'Test Stock Type',
    };

    it('should send 201 status code', async () => {
      const res = await request.post('/sectors').send(body);

      expect(res.statusCode).toEqual(201);
    });

    it('should create one sector', async () => {
      const res = await request.post('/sectors').send(body);
      const stockType = await models.Sector.findByPk(res.body.id);

      expect(stockType.name).toEqual(body.name);
    });

    it('should send created sector', async () => {
      const res = await request.post('/sectors').send(body);

      expect(res.body).toMatchObject(body);
    });
  });

  describe('PUT /sectors/:id', () => {
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
      const res = await request.put('/sectors/1').send(body);

      expect(res.statusCode).toEqual(200);
    });

    it('should update one sector', async () => {
      await request.put('/sectors/1').send(body);
      const stockType = await models.Sector.findByPk(1);

      expect(stockType.name).toEqual(body.name);
    });

    it('should send confirmation message', async () => {
      const res = await request.put('/sectors/1').send(body);

      expect(res.body).toHaveProperty('message', 'Modifications was updated');
    });
  });

  describe('DELETE /sectors/:id', () => {
    // Clear db and run migrations
    beforeEach(async () => {
      await models.sequelize
        .sync({ force: true })
        .then(() => new Seed(models.sequelize.getQueryInterface()).run());
    });

    it('should send 204 status code', async () => {
      const res = await request.delete('/sectors/1');

      expect(res.statusCode).toEqual(204);
    });

    it('should delete one sector', async () => {
      await request.delete('/sectors/1');
      const stockType = await models.Sector.findByPk(1);

      expect(stockType).toBeNull();
    });

    it('should send no content', async () => {
      const res = await request.delete('/sectors/1');

      expect(res.body).toEqual({});
    });
  });
});
