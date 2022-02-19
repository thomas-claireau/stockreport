const models = require('../models');

// Create and Save a new stockType
exports.create = async (req, res) => {
	try {
		const stockTypeBody = req.body;

		return res.status(201).json(
			await models.StockType.create({
				...stockTypeBody,
			})
		);
	} catch (error) {
		return res
			.status(501)
			.json({ message: error } || { message: 'Unexpected error' });
	}
};

// Retrieve all StockTypes from the database.
exports.findAll = async (req, res) => {
	try {
		const stockTypes = await models.StockType.findAll();

		if (stockTypes.length <= 0)
			return res.status(404).json({ message: 'Stock type not found' });

		return res.status(200).json(stockTypes);
	} catch (error) {
		return res
			.status(501)
			.json({ message: error } || { message: 'Unexpected error' });
	}
};

// Get one stockType
exports.findOne = async (req, res) => {
	try {
		const stockType = await models.StockType.findOne({
			where: { id: req.params.id },
		});

		if (!stockType)
			return res.status(404).json({ message: "Aucun type d'actif trouvé" });

		return res.status(200).json(stockType);
	} catch (error) {
		return res
			.status(501)
			.json({ message: error } || { message: 'Unexpected error' });
	}
};

// Update a StockType identified by the id in the request
exports.update = async (req, res) => {
	try {
		const stockTypeBody = req.body;

		await models.StockType.update(
			{ ...stockTypeBody },
			{ where: { id: req.params.id } }
		);

		return res.status(200).json({
			message: 'Modifications was updated',
		});
	} catch (error) {
		return res
			.status(501)
			.json({ message: error } || { message: 'Unexpected error' });
	}
};

// Delete a StockType with the specified id in the request
exports.delete = async (req, res) => {
	try {
		await models.StockType.destroy({
			where: { id: req.params.id },
		});

		return res.status(204).end();
	} catch (error) {
		return res
			.status(501)
			.json({ message: error } || { message: 'Unexpected error' });
	}
};
