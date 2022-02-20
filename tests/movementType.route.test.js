'use strict';

const supertest = require('supertest');
const app = require('../app.js');
const db = require('../models');

const request = supertest(app);

const faker = require('@faker-js/faker').faker;

describe('Movement Type API', () => {
	// Clear db and run migrations
	beforeEach(async () => {
		await db.MovementType.sync({ force: true });

		const types = ['transfer', 'purchase', 'sale', 'dividend', 'split'];
		const date = new Date().toISOString().substring(0, 10);

		await db.MovementType.bulkCreate(
			types.map((type) => {
				return { name: type, createdAt: date, updatedAt: date };
			})
		);
	});

	describe('Tests', () => {
		it('should show all movement types', async () => {
			const res = await request.get('/movement-types');
			expect(res.statusCode).toEqual(200);
			// expect(res.body).toHaveProperty('movements');
		});
	});
});
