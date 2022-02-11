'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Stocks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			isin: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			code: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			qty: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			price: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			fee: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			etf: {
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable('Stocks');
	},
};
