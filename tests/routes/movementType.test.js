'use strict';

const supertest = require('supertest');
const app = require('../../app.js');
const models = require('../../models');
const Seed = require('../../utils/Seed');

const request = supertest(app);

describe('Movement Types API', () => {
	// Clear db and run migrations
	beforeEach(async () => {
		try {
			await models.sequelize
				.sync({ force: true })
				.then(() => new Seed(models.sequelize.getQueryInterface()).run());
		} catch (error) {
			console.log(error);
		}
	});

	describe('GET /movement-types', () => {
		it('should show all movement types', async () => {
			try {
				const res = await request.get('/movement-types');
				expect(res.statusCode).toEqual(200);
			} catch (error) {
				console.log(error);
			}
		});
	});

	describe('GET /movement-types/:id', () => {
		it('should show one movement type', async () => {
			try {
				const res = await request.get('/movement-types/1');
				expect(res.statusCode).toEqual(200);
			} catch (error) {
				console.log(error);
			}
		});
	});
});
