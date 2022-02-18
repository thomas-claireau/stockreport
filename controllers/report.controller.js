const models = require('../models');

// Create and Save a new report
exports.create = async (req, res) => {
	try {
		const reportBody = req.body;

		res.status(201).json(
			await models.Report.create({
				...reportBody,
			})
		);
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};

// Retrieve all Reports from the database.
exports.findAll = async (req, res) => {
	try {
		const reports = await models.Report.findAll({
			attributes: {
				exclude: ['StockId'],
			},
			include: [
				{
					model: models.Stock,
					attributes: ['id', 'pru', 'qty'],
				},
			],
			order: [['updatedAt', 'DESC']],
		});

		if (reports.length <= 0)
			return res
				.status(404)
				.json({ message: "Aucun relevé n'a été trouvé" });

		return res.status(200).json(reports);
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};

// Get one report
exports.findOne = async (req, res) => {
	try {
		const report = await models.Report.findOne({
			attributes: {
				exclude: ['StockId'],
			},
			include: [
				{
					model: models.Stock,
					attributes: ['id', 'pru'],
				},
			],
			where: { id: req.params.id },
		});

		if (!report)
			return res.status(404).json({ message: 'Aucun relevé trouvé' });

		return res.status(200).json(report);
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};

// Update a Report identified by the id in the request
exports.update = async (req, res) => {
	try {
		const reportBody = req.body;

		await models.Report.update(
			{ ...reportBody },
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

// Delete a Report with the specified id in the request
exports.delete = async (req, res) => {
	try {
		await models.Report.destroy({
			where: { id: req.params.id },
		});

		res.status(204).end();
	} catch (error) {
		res.status(501).json(
			{ message: error } || { message: 'Unexpected error' }
		);
	}
};
