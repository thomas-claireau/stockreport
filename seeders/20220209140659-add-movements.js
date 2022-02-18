'use strict';

const faker = require('@faker-js/faker').faker;

const MONTHS = 2; // tests on 2 months
const WEEKS = 4; // weeks in a month
const DAYS = 5; // 5 days per weeks
const HOURS = 10; // 10 hours per day (8h-18h)
const STEPS = 2; // number of movements per hour;

const MOVEMENTS = MONTHS * WEEKS * DAYS * HOURS * STEPS;

module.exports = {
	async up(queryInterface, Sequelize) {
		const movements = [];

		for (let i = 0; i < MOVEMENTS; i++) {
			const date = new Date();
			const randomDate = faker.datatype.datetime();
			const time = `${randomDate.getHours()}:${randomDate.getMinutes()}:${randomDate.getSeconds()}`;

			date.setDate(
				date.getDate() - faker.datatype.number({ min: 1, max: MOVEMENTS })
			);
			const dateString = date.toISOString().substring(0, 10);

			const isTransfer = faker.datatype.boolean();
			const movement = {
				amount:
					faker.datatype.float({ min: 300, max: 600 }) *
					(faker.datatype.number({ min: 0, max: 1 }) ? 1 : -1) *
					100,
				createdAt: dateString + ' ' + time,
				updatedAt: dateString + ' ' + time,
			};

			if (isTransfer) {
				movement.MovementTypeId = 1; // transfer
			} else {
				movement.MovementTypeId = 2; // purchase
				movement.StockId = faker.datatype.number({ min: 1, max: 10 });
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
