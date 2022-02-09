'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('stocks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			isin: {
				type: Sequelize.STRING,
			},
			code: {
				type: Sequelize.STRING,
			},
			qty: {
				type: Sequelize.INTEGER,
			},
			price: {
				type: Sequelize.FLOAT,
			},
			fee: {
				type: Sequelize.FLOAT,
			},
			type: {
				type: Sequelize.INTEGER,
				references: { model: 'stockTypes', key: 'id' },
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
				allowNull: false,
			},
			etf: {
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable('stocks');
	},
};
