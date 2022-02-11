'use strict';

const faker = require('@faker-js/faker').faker;

module.exports = {
	async up(queryInterface, Sequelize) {
		const movements = [];

		for (let i = 0; i < 25; i++) {
			const date = new Date();
			date.setDate(
				date.getDate() - faker.datatype.number({ min: i, max: 25 })
			);
			const dateString = date.toISOString().substring(0, 10);

			const isTransfer = faker.datatype.boolean();
			const movement = {
				amount:
					faker.datatype.float({ min: 300, max: 600 }) *
					(faker.datatype.number({ min: 0, max: 1 }) ? 1 : -1) *
					100,
				createdAt: dateString,
				updatedAt: dateString,
			};

			if (isTransfer) {
				movement.MovementTypeId = 1; // transfer
			} else {
				movement.MovementTypeId = 2; // purchase
				movement.qty = faker.datatype.number({ min: 1, max: 10 });
				movement.live =
					faker.datatype.float({ min: 300, max: 600 }) *
					(faker.datatype.number({ min: 0, max: 1 }) ? 1 : -1) *
					100;
			}

			movements.push(movement);
		}

		await queryInterface.bulkInsert('Movements', movements);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Movements', null, {});
	},
};
