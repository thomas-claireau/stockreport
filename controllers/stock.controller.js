const models = require('../models');

// Create and Save a new stock
exports.create = (req, res) => {
	const stockBody = req.body;

	models.Stock.create({
		...stockBody,
	})
		.then((stock) => {
			res.status(201).json({
				...stock,
			});
		})
		.catch((err) => res.status(501).json(err));
};

// Retrieve all Stocks from the database.
exports.findAll = (req, res) => {
	models.Stock.findAll()
		.then((summaries) => {
			if (summaries.length <= 0)
				return res
					.status(404)
					.json({ message: "Aucun actif n'a été trouvé" });

			return res.status(200).json(summaries);
		})
		.catch((err) => res.status(501).json(err));
};

// Get one stock
exports.findOne = (req, res) => {
	models.Stock.findOne({
		where: { id: req.params.id },
	})
		.then((stock) => {
			if (!stock)
				return res.status(404).json({ message: 'Aucun actif trouvé' });

			return res.status(200).json(stock);
		})
		.catch((err) => res.status(501).json(err));
};

// Update a Stock identified by the id in the request
exports.update = (req, res) => {
	const stockBody = req.body;

	models.Stock.update({ ...stockBody }, { where: { id: req.params.id } })
		.then(() =>
			res.status(200).json({
				message: 'Les modifications ont été enregistrées',
			})
		)
		.catch((err) => res.status(501).json(err));
};

// Delete a Stock with the specified id in the request
exports.delete = (req, res, next) => {
	models.Stock.destroy({
		where: { id: req.params.id },
	})
		.then(() => res.status(204).end())
		.catch((err) => res.status(501).json(err));
};
