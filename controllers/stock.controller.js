const models = require('../models');

// Create and Save a new stock
exports.create = async (req, res) => {
	try {
		const stockBody = req.body;

		res.status(201).json(
			await models.Stock.create({
				...stockBody,
			})
		);
	} catch (error) {
		res.status(501).json(error || { message: 'Unexpected error' });
	}
};

// Retrieve all Stocks from the database.
exports.findAll = async (req, res) => {
	try {
		const stocks = await models.Stock.findAll({
			attributes: {
				exclude: ['StockTypeId'],
			},
			include: [
				{
					model: models.StockType,
					attributes: ['name'],
				},
			],
		});

		if (stocks.length <= 0)
			res.status(404).json({ message: "Stock not found" });

		res.status(200).json(stocks);
	} catch (error) {
		res.status(501).json(error || { message: 'Unexpected error' });
	}
};

// Get one stock
exports.findOne = async (req, res) => {
	try {
		const stock = await models.Stock.findOne({
			where: { id: req.params.id },
			attributes: {
				exclude: ['StockTypeId'],
			},
			include: [
				{
					model: models.StockType,
					attributes: ['name'],
				},
			],
		});

		if (!stock) res.status(404).json({ message: 'Stock not found' });

		res.status(200).json(stock);
	} catch (error) {
		res.status(501).json(error || { message: 'Unexpected error' });
	}
};

// Update a Stock identified by the id in the request
exports.update = async (req, res) => {
	try {
		const stockBody = req.body;

		await models.Stock.update(
			{ ...stockBody },
			{ where: { id: req.params.id } }
		);

		res.status(200).json({
			message: 'Modifications was updated',
		});
	} catch (error) {
		res.status(501).json(error || { message: 'Unexpected error' });
	}
};

// Delete a Stock with the specified id in the request
exports.delete = async (req, res) => {
	try {
		await models.Stock.destroy({
			where: { id: req.params.id },
		});

		res.status(204).end();
	} catch (error) {
		res.status(501).json(error || { message: 'Unexpected error' });
	}
};
