const models = require('../models');

// Create and Save a new stockType
exports.create = (req, res) => {
	const stockTypeBody = req.body;

	models.StockType.create({
		...stockTypeBody,
	})
		.then((stockType) => {
			res.status(201).json({
				...stockType,
			});
		})
		.catch((err) => res.status(501).json(err));
};

// Retrieve all StockTypes from the database.
exports.findAll = (req, res) => {
	models.StockType.findAll()
		.then((stockTypes) => {
			if (stockTypes.length <= 0)
				return res
					.status(404)
					.json({ message: "Aucun type d'actif n'a été trouvé" });

			return res.status(200).json(stockTypes);
		})
		.catch((err) => res.status(501).json(err));
};

// Get one stockType
exports.findOne = (req, res) => {
	models.StockType.findOne({
		where: { id: req.params.id },
	})
		.then((stockType) => {
			if (!stockType)
				return res.status(404).json({ message: 'Aucun type d\'actif trouvé' });

			return res.status(200).json(stockType);
		})
		.catch((err) => res.status(501).json(err));
};

// Update a StockType identified by the id in the request
exports.update = (req, res) => {
	const stockTypeBody = req.body;

	models.StockType.update({ ...stockTypeBody }, { where: { id: req.params.id } })
		.then(() =>
			res.status(200).json({
				message: 'Les modifications ont été enregistrées',
			})
		)
		.catch((err) => res.status(501).json(err));
};

// Delete a StockType with the specified id in the request
exports.delete = (req, res, next) => {
	models.StockType.destroy({
		where: { id: req.params.id },
	})
		.then(() => res.status(204).end())
		.catch((err) => res.status(501).json(err));
};
