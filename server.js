const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

const cmd = require('node-cmd');

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

const corsOptions = {
	origin: 'http://localhost:' + PORT,
};

if (ENV == 'development') {
	db.sequelize.sync({ force: true }).then(() => {
		cmd.run('sequelize db:seed:all');
	});
} else {
	db.sequelize.sync();
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({ message: 'Welcome' });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
