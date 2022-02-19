const request = require('supertest');
const app = require('../app.js');

describe('Movement API', () => {
	it('should show all movements', async () => {
		const res = await request(app).get('/movements');
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('movements');
	});
});
