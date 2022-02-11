const models = require('../models');

// Create and Save a new movement
exports.create = (req, res) => {
	const movementBody = req.body;

	models.Movement.create({
		...movementBody,
	})
		.then((movement) => {
			res.status(201).json({
				...movement,
			});
		})
		.catch((err) => res.status(501).json(err));
};

// Retrieve all Movements from the database.
exports.findAll = (req, res) => {
	models.Movement.findAll({
		attributes: {
			exclude: ['MovementTypeId'],
		},
		include: [
			{
				model: models.MovementType,
				attributes: ['name'],
			},
		],
	})
		.then((movements) => {
			if (movements.length <= 0)
				return res
					.status(404)
					.json({ message: "Aucun mouvement n'a été trouvé" });

			return res.status(200).json(movements);
		})
		.catch((err) => res.status(501).json(err));
};

// Get one movement
exports.findOne = (req, res) => {
	models.Movement.findOne({
		where: { id: req.params.id },
	})
		.then((movement) => {
			if (!movement)
				return res.status(404).json({ message: 'Aucun mouvement trouvé' });

			return res.status(200).json(movement);
		})
		.catch((err) => res.status(501).json(err));
};

// Update a Movement identified by the id in the request
exports.update = (req, res) => {
	const movementBody = req.body;

	models.Movement.update({ ...movementBody }, { where: { id: req.params.id } })
		.then(() =>
			res.status(200).json({
				message: 'Les modifications ont été enregistrées',
			})
		)
		.catch((err) => res.status(501).json(err));
};

// Delete a Movement with the specified id in the request
exports.delete = (req, res, next) => {
	models.Movement.destroy({
		where: { id: req.params.id },
	})
		.then(() => res.status(204).end())
		.catch((err) => res.status(501).json(err));
};
