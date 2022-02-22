'use strict';

const supertest = require('supertest');
const app = require('../../app.js');
const models = require('../../models');
const Seed = require('../../utils/Seed');

const request = supertest(app);

describe('Reports API', () => {
	// Clear db and run migrations
	beforeAll(async () => {
		await models.sequelize
			.sync({ force: true })
			.then(() => new Seed(models.sequelize.getQueryInterface()).run());
	});

	describe('GET /reports', () => {
		it('should send 200 status code', async () => {
			const res = await request.get('/reports');

			expect(res.statusCode).toEqual(200);
		});

		it('should show all reports', async () => {
			const res = await request.get('/reports');

			expect(res.body).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						amount: expect.any(Number),
						Stock: expect.any(Object),
					}),
				])
			);
		});
	});

	describe('GET /reports/:id', () => {
		it('should send 200 status code', async () => {
			const res = await request.get('/reports/1');
			expect(res.statusCode).toEqual(200);
		});

		it('should show one report', async () => {
			const res = await request.get('/reports/1');

			expect(res.body).toEqual(
				expect.objectContaining({
					amount: expect.any(Number),
					Stock: expect.any(Object),
				})
			);
		});
	});

	describe('POST /reports', () => {
		const body = {
			amount: 650,
			StockId: 1,
		};

		it('should send 201 status code', async () => {
			const res = await request.post('/reports').send(body);

			expect(res.statusCode).toEqual(201);
		});

		it('should create one report', async () => {
			const res = await request.post('/reports').send(body);
			const report = await models.Report.findByPk(res.body.id);

			expect(report.amount).toEqual(body.amount);
			expect(report.StockId).toEqual(body.StockId);
		});

		it('should send created report', async () => {
			const res = await request.post('/reports').send(body);

			expect(res.body).toMatchObject(body);
		});
	});

	describe('PUT /reports/:id', () => {
		const body = {
			amount: 700,
		};

		// Clear db and run migrations
		beforeEach(async () => {
			await models.sequelize
				.sync({ force: true })
				.then(() => new Seed(models.sequelize.getQueryInterface()).run());
		});

		it('should send 200 status code', async () => {
			const res = await request.put('/reports/1').send(body);

			expect(res.statusCode).toEqual(200);
		});

		it('should update one report', async () => {
			await request.put('/reports/1').send(body);
			const report = await models.Report.findByPk(1);

			expect(report.amount).toEqual(body.amount);
		});

		it('should send confirmation message', async () => {
			const res = await request.put('/reports/1').send(body);

			expect(res.body).toHaveProperty(
				'message',
				'Modifications was updated'
			);
		});
	});

	describe('DELETE /reports/:id', () => {
		// Clear db and run migrations
		beforeEach(async () => {
			await models.sequelize
				.sync({ force: true })
				.then(() => new Seed(models.sequelize.getQueryInterface()).run());
		});

		it('should send 204 status code', async () => {
			const res = await request.delete('/reports/1');

			expect(res.statusCode).toEqual(204);
		});

		it('should delete one report', async () => {
			await request.delete('/reports/1');
			const report = await models.Report.findByPk(1);

			expect(report).toBeNull();
		});

		it('should send no content', async () => {
			const res = await request.delete('/reports/1');

			expect(res.body).toEqual({});
		});
	});
});
