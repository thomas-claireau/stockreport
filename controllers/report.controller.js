const models = require('../models');

// Create and Save a new report
exports.create = (req, res) => {
	const reportBody = req.body;

	models.Report.create({
		...reportBody,
	})
		.then((report) => {
			res.status(201).json({
				...report,
			});
		})
		.catch((err) => res.status(501).json(err));
};

// Retrieve all Reports from the database.
exports.findAll = (req, res) => {
	models.Report.findAll({
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
	})
		.then((reports) => {
			if (reports.length <= 0)
				return res
					.status(404)
					.json({ message: "Aucun relevé n'a été trouvé" });

			return res.status(200).json(reports);
		})
		.catch((err) => res.status(501).json(err));
};

// Get one report
exports.findOne = (req, res) => {
	models.Report.findOne({
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
	})
		.then((report) => {
			if (!report)
				return res.status(404).json({ message: 'Aucun relevé trouvé' });

			return res.status(200).json(report);
		})
		.catch((err) => res.status(501).json(err));
};

// Update a Report identified by the id in the request
exports.update = (req, res) => {
	const reportBody = req.body;

	models.Report.update({ ...reportBody }, { where: { id: req.params.id } })
		.then(() =>
			res.status(200).json({
				message: 'Les modifications ont été enregistrées',
			})
		)
		.catch((err) => res.status(501).json(err));
};

// Delete a Report with the specified id in the request
exports.delete = (req, res, next) => {
	models.Report.destroy({
		where: { id: req.params.id },
	})
		.then(() => res.status(204).end())
		.catch((err) => res.status(501).json(err));
};
