'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Summaries', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			sum: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			yesterday_sum: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			pru: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			rest: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Summaries');
	},
};
