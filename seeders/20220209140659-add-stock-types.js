'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const types = ['action', 'obligation', 'sicav', 'fcp'];
		const date = new Date().toISOString().substring(0, 10);

		queryInterface.bulkInsert(
			'StockTypes',
			types.map((type) => {
				return { name: type, createdAt: date, updatedAt: date };
			})
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('StockTypes', null, {});
	},
};
