const models = require('../models');

// Create and Save a new summary
exports.create = (req, res) => {
	const userBody = req.body;

	models.User.findOne({
		attributes: ['email'],
		where: { email: userBody.email },
	})
		.then((user) => {
			if (user)
				return res
					.status(409)
					.json({ message: "L'email utilisé correspond déja a un compte existant" });

			models.User.findOne({
				attributes: ['username'],
				where: { username: userBody.username },
			})
				.then((user) => {
					if (user)
						return res.status(409).json({
							message: 'Le username utilisé correspond déja a un compte existant',
						});

					bcrypt.hash(userBody.password, 10, function(err, bcryptPassword) {
						models.User.create({ ...userBody, password: bcryptPassword })
							.then((user) => {
								res.status(201).json({
									userId: user.dataValues.id,
									token: jwt.generateToken(user.dataValues),
									isAdmin: user.dataValues.isAdmin,
								});
							})
							.catch((err) => res.status(501).json(err));
					});
				})
				.catch((err) => res.status(501).json(err));
		})
		.catch((err) => res.status(501).json(err));
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
	models.User.findAll({
		attributes: ['email', 'firstname', 'lastname', 'username', 'isAdmin', 'biography'],
	})
		.then((users) => {
			if (users.length <= 0)
				return res.status(404).json({ message: "Aucun utilisateur n'a été trouvé" });

			return res.status(200).json(users);
		})
		.catch((err) => res.status(501).json(err));
};

// Get one user
exports.findOne = (req, res) => {
	models.User.findOne({
		attributes: ['id', 'email', 'firstname', 'lastname', 'username', 'isAdmin', 'biography'],
		where: { id: req.params.userId },
	})
		.then((user) => {
			if (!user) return res.status(404).json({ message: "Aucun utilisateur n'a été trouvé" });

			return res.status(200).json(user);
		})
		.catch((err) => res.status(501).json(err));
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
	const userBody = req.body;
	const id = req.params.userId;
	const jwtUserId = jwt.getUserId(req.headers.authorization);

	models.User.findOne({
		attributes: ['id'],
		where: { id: id },
	})
		.then((user) => {
			// si pas de user -> return 404
			if (!user) return res.status(404).json({ message: 'Pas de user à modifier' });

			// non autorisé par jwt
			if (user.dataValues.id != jwtUserId)
				return res
					.status(401)
					.json({ message: "Vous n'êtes pas autorisé à modifier ce user" });

			models.User.findOne({
				attributes: ['id'],
				where: { email: userBody.email },
			})
				.then((item) => {
					// si email a modifié = a un autre -> return 409 conflit
					if (item && item.dataValues.id != id)
						return res
							.status(409)
							.json({ message: 'Cet email est déja utilisé sur un autre user' });

					models.User.findOne({
						attributes: ['id'],
						where: { username: userBody.username },
					})
						.then((item) => {
							// si username a modifié = a un autre -> return 409 conflit
							if (item && item.dataValues.id != id)
								return res.status(409).json({
									message: 'Ce username est déja utilisé sur un autre user',
								});

							const objUser = {
								email: req.body.email,
								firstname: req.body.firstname,
								lastname: req.body.lastname,
								username: req.body.username,
								biography: req.body.biography,
								isAdmin: req.body.isAdmin,
							};

							if (req.body.newPassword) {
								bcrypt.hash(req.body.newPassword, 10, (err, bcryptNewPassword) => {
									models.User.update(
										{ ...objUser, password: bcryptNewPassword },
										{ where: { id: user.id } }
									)
										.then(() =>
											res.status(200).json({
												message: 'Les modifications ont été enregistrées',
											})
										)
										.catch((err) => res.status(501).json(err));
								});
							} else {
								models.User.update({ ...objUser }, { where: { id: user.id } })
									.then(() =>
										res.status(200).json({
											message: 'Les modifications ont été enregistrées',
										})
									)
									.catch((err) => res.status(501).json(err));
							}
						})
						.catch((err) => res.status(501).json(err));
				})
				.catch((err) => res.status(501).json(err));
		})
		.catch((err) => res.status(501).json(err));
};

// Delete a User with the specified userId in the request
exports.delete = (req, res, next) => {
	const id = req.params.userId;
	const jwtUserId = jwt.getUserId(req.headers.authorization);

	models.User.findOne({
		attributes: ['id'],
		where: { id: id },
	})
		.then((user) => {
			// si pas de user -> return 404
			if (!user) return res.status(404).json({ message: 'Pas de user à supprimer' });

			if (user.dataValues.id != jwtUserId)
				return res
					.status(401)
					.json({ message: "Vous n'êtes pas autorisé à supprimer ce user" });

			models.User.destroy({
				where: { id: id },
			})
				.then(() => res.status(204).end())
				.catch((err) => res.status(501).json(err));
		})
		.catch((err) => res.status(501).json(err));
};
