'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Summary extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Summary.init(
		{
			sum: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			yesterday_sum: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			rest: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Summary',
		}
	);
	return Summary;
};
