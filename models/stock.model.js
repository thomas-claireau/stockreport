'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Stock extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Stock.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			isin: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			code: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			qty: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			fee: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			type: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			etf: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Stock',
		}
	);
	return Stock;
};
