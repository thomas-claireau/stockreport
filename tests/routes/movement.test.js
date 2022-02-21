'use strict';

const supertest = require('supertest');
const app = require('../../app.js');
const models = require('../../models');
const Seed = require('../../utils/Seed');

const request = supertest(app);

describe('Movements API', () => {
	// Clear db and run migrations
	beforeAll(async () => {
		await models.sequelize
			.sync({ force: true })
			.then(() => new Seed(models.sequelize.getQueryInterface()).run());
	});

	describe('GET /movements', () => {
		it('should send 200 status code', async () => {
			const res = await request.get('/movements');

			expect(res.statusCode).toEqual(200);
		});

		it('should show all movements', async () => {
			const res = await request.get('/movements');

			expect(res.body).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						qty: expect.any(Number),
						live: expect.any(Number),
						amount: expect.any(Number),
						MovementType: expect.any(Object),
					}),
				])
			);
		});
	});

	describe('GET /movements/:id', () => {
		it('should send 200 status code', async () => {
			const res = await request.get('/movements/1');
			expect(res.statusCode).toEqual(200);
		});

		describe('Transfer movement', () => {
			it('should show one movement', async () => {
				const transfer = await models.Movement.findOne({
					where: {
						MovementTypeId: 1,
					},
				});

				expect(transfer).not.toBeNull();

				const res = await request.get('/movements/' + transfer.id);

				expect(res.body).toEqual(
					expect.objectContaining({
						amount: expect.any(Number),
						MovementType: expect.any(Object),
					})
				);

				expect(res.body.live).toBeNull();
				expect(res.body.qty).toBeNull();
				expect(res.body.Stock).toBeNull();
			});
		});

		describe('Purchase movement', () => {
			it('should show one movement', async () => {
				const transfer = await models.Movement.findOne({
					where: {
						MovementTypeId: 2,
					},
				});

				expect(transfer).not.toBeNull();

				const res = await request.get('/movements/' + transfer.id);

				expect(res.body).toEqual(
					expect.objectContaining({
						live: expect.any(Number),
						qty: expect.any(Number),
						amount: expect.any(Number),
						MovementType: expect.any(Object),
						Stock: expect.any(Object),
					})
				);
			});
		});
	});

	describe('POST /movements', () => {
		describe('Transfer movement', () => {
			const body = {
				amount: 60000,
				StockId: 1,
				qty: 20,
				live: 2000,
				MovementTypeId: 1,
			};

			it('should send 201 status code', async () => {
				const res = await request.post('/movements').send(body);

				expect(res.statusCode).toEqual(201);
			});

			it('should create one movement', async () => {
				const res = await request.post('/movements').send(body);
				const movement = await models.Movement.findByPk(res.body.id);

				expect(movement.amount).toEqual(body.amount);
			});

			it('should created movement with live attribute to null', async () => {
				const res = await request.post('/movements').send(body);

				expect(res.body.live).toBeNull();
			});

			it('should created movement with qty attribute to null', async () => {
				const res = await request.post('/movements').send(body);

				expect(res.body.qty).toBeNull();
			});

			it('should created movement with Stock attribute to null', async () => {
				const res = await request.post('/movements').send(body);

				expect(res.body.StockId).toBeNull();
			});
		});

		describe('Transfer purchase', () => {
			const body = {
				amount: 60000,
				StockId: 1,
				qty: 20,
				live: 2000,
				MovementTypeId: 2,
			};

			it('should send 201 status code', async () => {
				const res = await request.post('/movements').send(body);

				expect(res.statusCode).toEqual(201);
			});

			it('should create one movement', async () => {
				const res = await request.post('/movements').send(body);
				const movement = await models.Movement.findByPk(res.body.id);

				expect(movement.amount).toEqual(body.amount);
			});

			it('should send created movement', async () => {
				const res = await request.post('/movements').send(body);

				for (const key in res.body) {
					if (Object.hasOwnProperty.call(res.body, key)) {
						expect(res.body).toContainEntry([key, res.body[key]]);
					}
				}
			});
		});
	});

	describe('PUT /movements', () => {
		const body = {
			amount: 8000,
		};

		// Clear db and run migrations
		beforeEach(async () => {
			await models.sequelize
				.sync({ force: true })
				.then(() => new Seed(models.sequelize.getQueryInterface()).run());
		});

		it('should send 200 status code', async () => {
			const res = await request.put('/movements/1').send(body);

			expect(res.statusCode).toEqual(200);
		});

		it('should update one movement', async () => {
			await request.put('/movements/1').send(body);
			const movement = await models.Movement.findByPk(1);

			expect(movement.amount).toEqual(body.amount);
		});

		it('should update one transfer movement to purchase movement', async () => {
			const body = {
				MovementTypeId: 1,
			};

			const transfer = await models.Movement.findOne({
				where: {
					MovementTypeId: 2,
				},
			});

			expect(transfer).not.toBeNull();

			await request.put('/movements/' + transfer.id).send(body);

			const movement = await models.Movement.findByPk(transfer.id);

			expect(movement.MovementTypeId).toEqual(1);
			expect(movement.live).toBeNull();
			expect(movement.qty).toBeNull();
			expect(movement.StockId).toBeNull();
		});
		it('should update one purchase movement to transfer movement', async () => {});

		it('should send confirmation message', async () => {
			const res = await request.put('/movements/1').send(body);

			expect(res.body).toHaveProperty(
				'message',
				'Modifications was updated'
			);
		});
	});

	describe('DELETE /movements/:id', () => {
		// Clear db and run migrations
		beforeEach(async () => {
			await models.sequelize
				.sync({ force: true })
				.then(() => new Seed(models.sequelize.getQueryInterface()).run());
		});

		it('should send 204 status code', async () => {
			const res = await request.delete('/movements/1');

			expect(res.statusCode).toEqual(204);
		});

		it('should delete one movement', async () => {
			await request.delete('/movements/1');
			const movement = await models.Movement.findByPk(1);

			expect(movement).toBeNull();
		});

		it('should send no content', async () => {
			const res = await request.delete('/movements/1');

			expect(res.body).toEqual({});
		});
	});
});
