'use strict';

const faker = require('@faker-js/faker').faker;

const MONTHS = 2; // tests on 2 months
const WEEKS = 4; // weeks in a month
const DAYS = 5; // 5 days per weeks
const HOURS = 10; // 10 hours per day (8h-18h)
const STEPS = 2; // number of movements per hour;

const REPORTS = MONTHS * WEEKS * DAYS * HOURS * STEPS;

module.exports = {
	async up(queryInterface, Sequelize) {
		for (let i = 0; i < REPORTS; i++) {
			const date = new Date();
			date.setDate(
				date.getDate() - faker.datatype.number({ min: i, max: REPORTS })
			);
			const dateString = date.toISOString().substring(0, 10);

			await queryInterface.bulkInsert('Reports', [
				{
					amount: faker.datatype.float({ min: 0, max: 200 }) * 100,
					StockId: faker.datatype.number({ min: 1, max: 10 }),
					createdAt: dateString,
					updatedAt: dateString,
				},
			]);
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Reports', null, {});
	},
};
