'use strict';

const Seed = require('../utils/Seed');

module.exports = {
	async up(queryInterface, Sequelize) {
		new Seed(queryInterface).movementType();
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('StockTypes', null, {});
	},
};
