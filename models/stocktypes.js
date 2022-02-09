'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class stockTypes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			stockTypes.hasOne(models.stocks, {
				foreignKey: 'type',
				as: 'stocks',
				onDelete: 'CASCADE',
			});
		}
	}
	stockTypes.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'stockTypes',
		}
	);
	return stockTypes;
};
