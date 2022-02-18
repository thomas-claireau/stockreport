require('dotenv').config();

const config = {};
const { NODE_ENV, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

config[NODE_ENV] = {
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: process.env[NODE_ENV == 'test' ? 'DB_TEST_NAME' : 'DB_NAME'],
	host: DB_HOST,
	dialect: 'mysql',
	dialectOptions: {
		timezone: 'Europe/Paris',
	},
	timezone: 'Europe/Paris',
};

module.exports = config;
