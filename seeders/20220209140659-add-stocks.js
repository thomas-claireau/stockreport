'use strict';

const faker = require('@faker-js/faker').faker;

module.exports = {
	async up(queryInterface, Sequelize) {
		const stocks = 10; // number of fake stocks

		for (let i = 0; i < stocks; i++) {
			const date = new Date();
			date.setDate(
				date.getDate() - faker.datatype.number({ min: i, max: stocks })
			);
			const dateString = date.toISOString().substring(0, 10);

			const pru = faker.datatype.float({ min: 0, max: 200 }) * 100;

			await queryInterface.bulkInsert('Stocks', [
				{
					name: faker.finance.currencyName(),
					isin: 'FR00001234',
					code: 'PAASI',
					StockTypeId: faker.datatype.number({ min: 1, max: 4 }),
					qty: faker.datatype.number({ min: 1, max: 50 }),
					etf: faker.datatype.number({ min: 0, max: 1 }),
					pru,
					live: pru + faker.datatype.number({ min: 0, max: 100 }),
					createdAt: dateString,
					updatedAt: dateString,
				},
			]);
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Stocks', null, {});
	},
};
