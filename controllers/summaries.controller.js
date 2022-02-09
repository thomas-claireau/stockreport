const models = require('../models');

const findAll = async (req, res) => {
	try {
		return res.status(200).json(await models.summaries.findAll());
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	findAll,
};
