const models = require('../models');

// Create and Save a new movement
exports.create = async (req, res) => {
	try {
		let stock;
		let movementBody = req.body;

		const type = await models.MovementType.findOne({
			where: { id: movementBody?.MovementTypeId },
		});

		if (!type)
			return res.status(404).json({ message: 'Movement Type not found' });

		if (type.name == models.MovementType.PURCHASE) {
			stock = await models.Stock.findOne({
				where: { id: movementBody?.StockId },
			});

			if (!stock)
				return res.status(404).json({ message: 'Stock not found' });

			if (!movementBody?.qty)
				return res.status(400).json({ message: 'Quantity is required' });

			if (!movementBody?.live)
				return res.status(400).json({ message: 'Live value is required' });
		} else {
			movementBody.qty = null;
			movementBody.live = null;
			movementBody.StockId = null;
		}

		return res.status(201).json(
			await models.Movement.create({
				...movementBody,
			})
		);
	} catch (error) {
		return res
			.status(501)
			.json({ message: error } || { message: 'Unexpected error' });
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
			return res.status(404).json({ message: 'Movements not found' });

		return res.status(200).json(movements);
	} catch (error) {
		return res
			.status(501)
			.json({ message: error } || { message: 'Unexpected error' });
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

		if (!movement)
			return res.status(404).json({ message: 'Movement not found' });

		return res.status(200).json(movement);
	} catch (error) {
		return res
			.status(501)
			.json({ message: error } || { message: 'Unexpected error' });
	}
};

// Update a Movement identified by the id in the request
exports.update = async (req, res) => {
	try {
		const movementBody = req.body;

		const movement = await models.Movement.findOne({
			where: { id: req.params.id },
		});

		if (!movement)
			return res.status(404).json({ message: 'Movement not found' });

		const movementType = await models.MovementType.findOne({
			where: { id: movementBody?.MovementTypeId || movement.MovementTypeId },
		});

		if (!movementType)
			return res.status(404).json({ message: 'Movement Type not found' });

		if (movementType.name == models.MovementType.PURCHASE) {
			const stock = await models.Stock.findOne({
				where: { id: movementBody?.StockId || movement.StockId },
			});

			if (!stock)
				return res.status(404).json({ message: 'Stock not found' });

			if (!(movementBody?.qty || movement.qty))
				return res.status(400).json({ message: 'Quantity is required' });

			if (!(movementBody?.live || movement.live))
				return res.status(400).json({ message: 'Live value is required' });
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

		return res.status(200).json({
			message: 'Modifications was updated',
		});
	} catch (error) {
		return res
			.status(501)
			.json({ message: error } || { message: 'Unexpected error' });
	}
};

// Delete a Movement with the specified id in the request
exports.delete = async (req, res) => {
	try {
		await models.Movement.destroy({
			where: { id: req.params.id },
		});

		return res.status(204).end();
	} catch (error) {
		return res
			.status(501)
			.json({ message: error } || { message: 'Unexpected error' });
	}
};
