const models = require('../models');

// Create and Save a new stockType
exports.create = async (req, res) => {
	try {
		const stockTypeBody = req.body;

		res.status(201).json(
			await models.StockType.create({
				...stockTypeBody,
			})
		);
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};

// Retrieve all StockTypes from the database.
exports.findAll = async (req, res) => {
	try {
		const stockTypes = await models.StockType.findAll();

		if (stockTypes.length <= 0)
			res.status(404).json({ message: "Aucun type d'actif n'a été trouvé" });

		res.status(200).json(stockTypes);
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};

// Get one stockType
exports.findOne = async (req, res) => {
	try {
		const stockType = await models.StockType.findOne({
			where: { id: req.params.id },
		});

		if (!stockType)
			res.status(404).json({ message: "Aucun type d'actif trouvé" });

		res.status(200).json(stockType);
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
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

		res.status(200).json({
			message: 'Les modifications ont été enregistrées',
		});
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};

// Delete a StockType with the specified id in the request
exports.delete = async (req, res) => {
	try {
		await models.StockType.destroy({
			where: { id: req.params.id },
		});

		res.status(204).end();
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};
