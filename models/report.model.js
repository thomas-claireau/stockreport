'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Report extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Report.belongsTo(models.Stock, {
				foreignKey: {
					allowNull: false,
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			});
		}
	}
	Report.init(
		{
			amount: {
				type: DataTypes.FLOAT,
			},
		},
		{
			sequelize,
			modelName: 'Report',
		}
	);

	return Report;
};
