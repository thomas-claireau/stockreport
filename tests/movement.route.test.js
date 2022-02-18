const request = require('supertest');

const database = require('../models/index');
const makeApp = require('../app');

const app = makeApp(database);

describe('Movement API', () => {
	it('should show all movements', async () => {
		const res = await request(app).get('/movements');
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('movements');
	});
});
