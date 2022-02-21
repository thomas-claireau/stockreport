'use strict';

const supertest = require('supertest');
const app = require('../../app.js');
const models = require('../../models');
const { Seed } = require('../../utils/seed.js');

const request = supertest(app);

const faker = require('@faker-js/faker').faker;

describe('Movement Types API', () => {
	// Clear db and run migrations
	beforeEach(async () => {
		await models.sequelize
			.sync({ force: true })
			.then(() => new Seed(models.sequelize.getQueryInterface()).run());
	});

	describe('GET /movement-types', () => {
		it('should show all movement types', async () => {
			const res = await request.get('/movement-types');
			expect(res.statusCode).toEqual(200);
		});
	});

	describe('GET /movement-types/:id', () => {
		it('should show one movement type', async () => {
			const res = await request.get('/movement-types/1');
			expect(res.statusCode).toEqual(200);
		});
	});
});
