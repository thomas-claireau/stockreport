require('dotenv').config();

const config = {};
const { NODE_ENV, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

config[NODE_ENV] = {
	username: DB_USERNAME || 'root',
	password: DB_PASSWORD || '',
	database: process.env[NODE_ENV == 'test' ? 'DB_TEST_NAME' : 'DB_NAME'] || 'stockreport_test',
	host: DB_HOST || '127.0.0.1',
	dialect: 'mysql',
	dialectOptions: {
		timezone: 'Europe/Paris',
	},
	timezone: 'Europe/Paris',
};

module.exports = config;
