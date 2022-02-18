const models = require('../models');

// Create and Save a new movementType
exports.create = async (req, res) => {
	const movementTypeBody = req.body;

	try {
		return res.status(201).json(
			await models.MovementType.create({
				...movementTypeBody,
			})
		);
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};

// Retrieve all movementTypes from the database.
exports.findAll = async (req, res) => {
	try {
		const movementTypes = await models.MovementType.findAll();

		if (movementTypes.length <= 0)
			return res
				.status(404)
				.json({ message: "Aucun type de mouvement n'a été trouvé" });

		return res.status(200).json(movementTypes);
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};

// Get one movementType
exports.findOne = async (req, res) => {
	try {
		const movementType = await models.MovementType.findOne({
			where: { id: req.params.id },
		});

		if (!movementType)
			return res
				.status(404)
				.json({ message: 'Aucun type de mouvement trouvé' });

		return res.status(200).json(movementType);
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};

// Update a MovementType identified by the id in the request
exports.update = async (req, res) => {
	try {
		const movementTypeBody = req.body;

		await models.MovementType.update(
			{ ...movementTypeBody },
			{ where: { id: req.params.id } }
		);

		return res.status(200).json({
			message: 'Les modifications ont été enregistrées',
		});
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};

// Delete a MovementType with the specified id in the request
exports.delete = async (req, res) => {
	try {
		await models.MovementType.destroy({
			where: { id: req.params.id },
		});

		return res.status(204).end();
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};
