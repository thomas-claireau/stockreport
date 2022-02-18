const models = require('../models');

// Create and Save a new movement
exports.create = async (req, res) => {
	try {
		let stock;
		let movementBody = req.body;

		const type = await models.MovementType.findOne({
			where: { id: movementBody?.MovementTypeId },
		});

		if (!type) res.status(404).json({ message: 'Movement Type not found' });

		if (type.name == models.MovementType.PURCHASE) {
			stock = await models.Stock.findOne({
				where: { id: movementBody?.StockId },
			});

			if (!stock) res.status(404).json({ message: 'Stock not found' });

			if (!movementBody?.qty)
				res.status(400).json({ message: 'Quantity is required' });

			if (!movementBody?.live)
				res.status(400).json({ message: 'Live value is required' });
		} else {
			movementBody.qty = null;
			movementBody.live = null;
		}

		res.status(201).json(
			await models.Movement.create({
				...movementBody,
			})
		);
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};

// Retrieve all Movements from the database.
exports.findAll = async (req, res) => {
	try {
		const movements = await models.Movement.findAll({
			attributes: {
				exclude: ['MovementTypeId', 'StockId'],
			},
			include: [
				{
					model: models.MovementType,
					attributes: ['name'],
				},
				{
					model: models.Stock,
					attributes: ['name'],
				},
			],
			order: [['updatedAt', 'DESC']],
		});

		if (movements.length <= 0)
			res.status(404).json({ message: 'Movements not found' });

		res.status(200).json({movements});
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};

// Get one movement
exports.findOne = async (req, res) => {
	try {
		const movement = await models.Movement.findOne({
			where: { id: req.params.id },
			attributes: {
				exclude: ['MovementTypeId', 'StockId'],
			},
			include: [
				{
					model: models.MovementType,
					attributes: ['name'],
				},
				{
					model: models.Stock,
					attributes: ['name'],
				},
			],
		});

		if (!movement) res.status(404).json({ message: 'Movement not found' });

		res.status(200).json(movement);
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};

// Update a Movement identified by the id in the request
exports.update = async (req, res) => {
	try {
		const movementBody = req.body;

		const movement = await models.Movement.findOne({
			where: { id: req.params.id },
		});

		if (!movement) res.status(404).json({ message: 'Movement not found' });

		const movementType = await models.MovementType.findOne({
			where: { id: movementBody?.MovementTypeId || movement.MovementTypeId },
		});

		if (!movementType)
			res.status(404).json({ message: 'Movement Type not found' });

		if (movementType.name == models.MovementType.PURCHASE) {
			const stock = await models.Stock.findOne({
				where: { id: movementBody?.StockId || movement.StockId },
			});

			if (!stock) res.status(404).json({ message: 'Stock not found' });

			if (!(movementBody?.qty || movement.qty))
				res.status(400).json({ message: 'Quantity is required' });

			if (!(movementBody?.live || movement.live))
				res.status(400).json({ message: 'Live value is required' });
		} else {
			movementBody.qty = null;
			movementBody.live = null;
			movementBody.StockId = null;
		}

		await models.Movement.update(
			{
				...movementBody,
			},
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

// Delete a Movement with the specified id in the request
exports.delete = async (req, res) => {
	try {
		await models.Movement.destroy({
			where: { id: req.params.id },
		});

		res.status(204).end();
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};
