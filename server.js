const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

const PORT = process.env.PORT || 3000;

const corsOptions = {
	origin: 'http://localhost:' + PORT,
};

db.sequelize.sync({ force: true });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({ message: 'Welcome' });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
