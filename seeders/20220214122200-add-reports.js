'use strict';

const Seed = require('../utils/Seed');

module.exports = {
	async up(queryInterface, Sequelize) {
		new Seed(queryInterface).report();
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Reports', null, {});
	},
};
