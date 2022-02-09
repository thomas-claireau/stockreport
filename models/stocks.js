'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class stocks extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	stocks.init(
		{
			name: DataTypes.STRING,
			isin: DataTypes.STRING,
			code: DataTypes.STRING,
			qty: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
			fee: DataTypes.INTEGER,
			type: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			},
		},
		{
			sequelize,
			modelName: 'stocks',
		}
	);
	return stocks;
};
