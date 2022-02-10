const models = require('../models');

// Create and Save a new summary
exports.create = (req, res) => {
	const summaryBody = req.body;

	models.Summary.create({
		...summaryBody,
	})
		.then((summary) => {
			res.status(201).json({
				...summary,
			});
		})
		.catch((err) => res.status(501).json(err));
};

// Retrieve all Summaries from the database.
exports.findAll = (req, res) => {
	models.Summary.findAll()
		.then((summaries) => {
			if (summaries.length <= 0)
				return res
					.status(404)
					.json({ message: "Aucun résumé n'a été trouvé" });

			return res.status(200).json(summaries);
		})
		.catch((err) => res.status(501).json(err));
};

// Get one summary
exports.findOne = (req, res) => {
	models.Summary.findOne({
		where: { id: req.params.id },
	})
		.then((summary) => {
			if (!summary)
				return res.status(404).json({ message: 'Aucun résumé trouvé' });

			return res.status(200).json(summary);
		})
		.catch((err) => res.status(501).json(err));
};

// Update a Summary identified by the id in the request
exports.update = (req, res) => {
	const summaryBody = req.body;

	models.Summary.update({ ...summaryBody }, { where: { id: req.params.id } })
		.then(() =>
			res.status(200).json({
				message: 'Les modifications ont été enregistrées',
			})
		)
		.catch((err) => res.status(501).json(err));
};

// Delete a Summary with the specified id in the request
exports.delete = (req, res, next) => {
	models.Summary.destroy({
		where: { id: req.params.id },
	})
		.then(() => res.status(204).end())
		.catch((err) => res.status(501).json(err));
};
