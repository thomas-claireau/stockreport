const models = require('../models');

// Create and Save a new movementType
exports.create = (req, res) => {
	const movementTypeBody = req.body;

	models.StockType.create({
		...movementTypeBody,
	})
		.then((movementType) => {
			res.status(201).json({
				...movementType,
			});
		})
		.catch((err) => res.status(501).json(err));
};

// Retrieve all movementTypes from the database.
exports.findAll = (req, res) => {
	models.StockType.findAll()
		.then((movementTypes) => {
			if (movementTypes.length <= 0)
				return res
					.status(404)
					.json({ message: "Aucun type de mouvement n'a été trouvé" });

			return res.status(200).json(movementTypes);
		})
		.catch((err) => res.status(501).json(err));
};

// Get one movementType
exports.findOne = (req, res) => {
	models.StockType.findOne({
		where: { id: req.params.id },
	})
		.then((movementType) => {
			if (!movementType)
				return res
					.status(404)
					.json({ message: 'Aucun type de mouvement trouvé' });

			return res.status(200).json(movementType);
		})
		.catch((err) => res.status(501).json(err));
};

// Update a StockType identified by the id in the request
exports.update = (req, res) => {
	const movementTypeBody = req.body;

	models.StockType.update(
		{ ...movementTypeBody },
		{ where: { id: req.params.id } }
	)
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
