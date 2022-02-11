'use strict';

const faker = require('@faker-js/faker').faker;

module.exports = {
	async up(queryInterface, Sequelize) {
		const days = 60;
		const startValue = 500;

		for (let i = 0; i < days; i++) {
			const date = new Date();
			date.setDate(date.getDate() - i);
			const dateString = date.toISOString().substring(0, 10);
			await queryInterface.bulkInsert('Summaries', [
				{
					sum: faker.datatype.float({ min: startValue, max: 1000 }) * 100,
					yesterday_sum: faker.datatype.float({ min: startValue, max: 1000 }) * 100,
					rest: faker.datatype.float({ min: startValue, max: 1000 }) * 100,
					createdAt: dateString,
					updatedAt: dateString,
				},
			]);
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Summaries', null, {});
	},
};
