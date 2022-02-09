'use strict';

const faker = require('@faker-js/faker').faker;

module.exports = {
	async up(queryInterface, Sequelize) {
		const movements = 25; // number of fake movements

		for (let i = 0; i < movements; i++) {
			const date = new Date();
			date.setDate(
				date.getDate() - faker.datatype.number({ min: i, max: movements })
			);
			const dateString = date.toISOString().substring(0, 10);
			await queryInterface.bulkInsert('Movements', [
				{
					amount:
						faker.datatype.float({ min: 300, max: 600 }) *
						(faker.datatype.number({ min: 0, max: 1 }) ? 1 : -1),
					createdAt: dateString,
					updatedAt: dateString,
				},
			]);
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Movements', null, {});
	},
};
