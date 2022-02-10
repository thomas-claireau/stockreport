'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class StockType extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			StockType.hasOne(models.Stock, {
				foreignKey: 'type',
				as: 'Stocks',
				onDelete: 'CASCADE',
			});
		}
	}
	StockType.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'StockType',
		}
	);
	return StockType;
};
