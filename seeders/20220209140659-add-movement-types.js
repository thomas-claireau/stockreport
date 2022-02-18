'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		const types = ['transfer', 'purchase', 'sale', 'dividend', 'split'];
		const date = new Date().toISOString().substring(0, 10);

		queryInterface.bulkInsert(
			'MovementTypes',
			types.map((type) => {
				return { name: type, createdAt: date, updatedAt: date };
			})
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('StockTypes', null, {});
	},
};
