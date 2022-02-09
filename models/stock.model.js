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
			name: DataTypes.STRING,
			isin: DataTypes.STRING,
			code: DataTypes.STRING,
			qty: DataTypes.INTEGER,
			price: DataTypes.FLOAT,
			fee: DataTypes.FLOAT,
			type: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
			etf: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: 'Stock',
		}
	);
	return Stock;
};
