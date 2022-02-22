require('dotenv').config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_TEST_NAME } =
  process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_TEST_NAME,
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
};
