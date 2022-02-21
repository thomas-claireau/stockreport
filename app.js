require('dotenv').config();

// some imports
const express = require('express');
const models = require('./models');
const cmd = require('node-cmd');

// environment variables
const ENV = process.env.NODE_ENV || 'development';

// Security Imports
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// Express app launching
const app = express();

// Routes Imports
const movements = require('./routes/movement.route');
const movementTypes = require('./routes/movementType.route');
const reports = require('./routes/report.route');
const stocks = require('./routes/stock.route');
const stockTypes = require('./routes/stockType.route');
const Seed = require('./utils/Seed');

// Helmet middlware for safe headers
app.use(helmet());
app.use(cors());

// express-rate-limit middleware to limit the amount of request done
const limiter = rateLimit({
	windowMs: 30 * 60 * 1000,
	max: 100,
});
app.use(limiter);

// Setting CORS headers
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Content-Type, Access-Control-Allow-Headers'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	);
	next();
});

// Parsing req
app.use(express.json());

// Security
app.use(hpp()); // HPP middleware to protect against HTTP parameter pollution attacks

// sync models
if (ENV == 'development') {
	models.sequelize
		.sync({ force: true })
		.then(() => new Seed(models.sequelize.getQueryInterface()).run());
} else if (ENV != 'test') {
	models.sequelize.sync();
}

// Setting routes
app.use('/movements', movements);
app.use('/movement-types', movementTypes);
app.use('/reports', reports);
app.use('/stocks', stocks);
app.use('/stock-types', stockTypes);

module.exports = app;
