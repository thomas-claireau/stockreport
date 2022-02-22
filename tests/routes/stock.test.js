'use strict';

const supertest = require('supertest');
const app = require('../../app.js');
const models = require('../../models');
const Seed = require('../../utils/Seed');

const request = supertest(app);

describe('Stocks API', () => {
	// Clear db and run migrations
	beforeAll(async () => {
		await models.sequelize
			.sync({ force: true })
			.then(() => new Seed(models.sequelize.getQueryInterface()).run());
	});

	describe('GET /stocks', () => {
		it('should send 200 status code', async () => {
			const res = await request.get('/stocks');

			expect(res.statusCode).toEqual(200);
		});

		it('should show all stocks', async () => {
			const res = await request.get('/stocks');

			expect(res.body).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						name: expect.any(String),
						isin: expect.any(String),
						code: expect.any(String),
						qty: expect.any(Number),
						etf: expect.any(Boolean),
						pru: expect.any(Number),
						StockType: expect.any(Object),
					}),
				])
			);
		});
	});

	describe('GET /stocks/:id', () => {
		it('should send 200 status code', async () => {
			const res = await request.get('/stocks/1');
			expect(res.statusCode).toEqual(200);
		});

		it('should show one stock', async () => {
			const res = await request.get('/stocks/1');

			expect(res.body).toEqual(
				expect.objectContaining({
					name: expect.any(String),
					isin: expect.any(String),
					code: expect.any(String),
					qty: expect.any(Number),
					etf: expect.any(Boolean),
					pru: expect.any(Number),
					StockType: expect.any(Object),
				})
			);
		});
	});

	describe('POST /stocks', () => {
		const body = {
			name: 'test-stock',
			pru: 3000,
			isin: 'FR00',
			code: 'code',
			qty: 3,
			etf: false,
			StockTypeId: 3,
		};

		it('should send 201 status code', async () => {
			const res = await request.post('/stocks').send(body);

			expect(res.statusCode).toEqual(201);
		});

		it('should create one stock', async () => {
			const res = await request.post('/stocks').send(body);
			const stock = await models.Stock.findByPk(res.body.id);

			expect(stock.name).toEqual(body.name);
			expect(stock.pru).toEqual(body.pru);
			expect(stock.isin).toEqual(body.isin);
			expect(stock.code).toEqual(body.code);
			expect(stock.qty).toEqual(body.qty);
			expect(stock.etf).toEqual(body.etf);
			expect(stock.StockTypeId).toEqual(body.StockTypeId);
		});

		it('should send created stock', async () => {
			const res = await request.post('/stocks').send(body);

			expect(res.body).toMatchObject(body);
		});
	});

	describe('PUT /stocks/:id', () => {
		const body = {
			name: 'update',
			StockTypeId: 2,
		};

		// Clear db and run migrations
		beforeEach(async () => {
			await models.sequelize
				.sync({ force: true })
				.then(() => new Seed(models.sequelize.getQueryInterface()).run());
		});

		it('should send 200 status code', async () => {
			const res = await request.put('/stocks/1').send(body);

			expect(res.statusCode).toEqual(200);
		});

		it('should update one stock', async () => {
			await request.put('/stocks/1').send(body);
			const stock = await models.Stock.findByPk(1);

			expect(stock.name).toEqual(body.name);
			expect(stock.StockTypeId).toEqual(body.StockTypeId);
		});

		it('should send confirmation message', async () => {
			const res = await request.put('/stocks/1').send(body);

			expect(res.body).toHaveProperty(
				'message',
				'Modifications was updated'
			);
		});
	});

	describe('DELETE /stocks/:id', () => {
		// Clear db and run migrations
		beforeEach(async () => {
			await models.sequelize
				.sync({ force: true })
				.then(() => new Seed(models.sequelize.getQueryInterface()).run());
		});

		it('should send 204 status code', async () => {
			const res = await request.delete('/stocks/1');

			expect(res.statusCode).toEqual(204);
		});

		it('should delete one stock', async () => {
			await request.delete('/stocks/1');
			const stock = await models.Stock.findByPk(1);

			expect(stock).toBeNull();
		});

		it('should send no content', async () => {
			const res = await request.delete('/stocks/1');

			expect(res.body).toEqual({});
		});
	});
});
