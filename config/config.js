require('dotenv').config();

const config = {};
const { NODE_ENV, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

const DB_NAME =
	process.env[NODE_ENV == 'test' ? 'DB_TEST_NAME' : 'DB_NAME'] ||
	'stockreport_test';

config[NODE_ENV] = {
	username: DB_USERNAME || 'root',
	password: DB_PASSWORD || 'root',
	database: DB_NAME,
	host: DB_HOST || 'localhost',
	dialect: 'mysql',
};

module.exports = config;
