'use strict';

const supertest = require('supertest');
const app = require('../../app.js');
const models = require('../../models');
const Seed = require('../../utils/Seed');

const request = supertest(app);

describe('Movement Types API', () => {
	// Clear db and run migrations
	beforeAll(async () => {
		await models.sequelize
			.sync({ force: true })
			.then(() => new Seed(models.sequelize.getQueryInterface()).run());
	});

	describe('GET /movement-types', () => {
		it('should send 200 status code', async () => {
			const res = await request.get('/movement-types');

			expect(res.statusCode).toEqual(200);
		});

		it('should show all movement types', async () => {
			const res = await request.get('/movement-types');

			expect(res.body).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						name: expect.any(String),
					}),
				])
			);
		});
	});

	describe('GET /movement-types/:id', () => {
		it('should send 200 status code', async () => {
			const res = await request.get('/movement-types/1');

			expect(res.statusCode).toEqual(200);
		});

		it('should show one movement type', async () => {
			const res = await request.get('/movement-types/1');

			expect(res.body).toEqual(
				expect.objectContaining({
					name: expect.any(String),
				})
			);
		});
	});

	describe('POST /movement-types', () => {
		const body = {
			name: 'Test Movement Type',
		};

		it('should send 201 status code', async () => {
			const res = await request.post('/movement-types').send(body);

			expect(res.statusCode).toEqual(201);
		});

		it('should create one movement type', async () => {
			const res = await request.post('/movement-types').send(body);
			const movementType = await models.MovementType.findByPk(res.body.id);

			expect(movementType.name).toEqual(body.name);
		});

		it('should send created movement type', async () => {
			const res = await request.post('/movement-types').send(body);

			expect(res.body).toMatchObject(body);
		});
	});

	describe('PUT /movement-types', () => {
		const body = {
			name: 'Update Movement Type',
		};

		// Clear db and run migrations
		beforeEach(async () => {
			await models.sequelize
				.sync({ force: true })
				.then(() => new Seed(models.sequelize.getQueryInterface()).run());
		});

		it('should send 200 status code', async () => {
			const res = await request.put('/movement-types/1').send(body);

			expect(res.statusCode).toEqual(200);
		});

		it('should update one movement type', async () => {
			await request.put('/movement-types/1').send(body);
			const movementType = await models.MovementType.findByPk(1);

			expect(movementType.name).toEqual(body.name);
		});

		it('should send confirmation message', async () => {
			const res = await request.put('/movement-types/1').send(body);

			expect(res.body).toHaveProperty(
				'message',
				'Modifications was updated'
			);
		});
	});

	describe('DELETE /movement-types/:id', () => {
		// Clear db and run migrations
		beforeEach(async () => {
			await models.sequelize
				.sync({ force: true })
				.then(() => new Seed(models.sequelize.getQueryInterface()).run());
		});

		it('should send 204 status code', async () => {
			const res = await request.delete('/movement-types/1');

			expect(res.statusCode).toEqual(204);
		});

		it('should delete one movement type', async () => {
			await request.delete('/movement-types/1');
			const movementType = await models.MovementType.findByPk(1);

			expect(movementType).toBeNull();
		});

		it('should send no content', async () => {
			const res = await request.delete('/movement-types/1');

			expect(res.body).toEqual({});
		});
	});
});
