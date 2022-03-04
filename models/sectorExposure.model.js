'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SectorExposure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.SectorExposure.belongsTo(models.Sector, {
        foreignKey: {
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      models.SectorExposure.belongsTo(models.Stock, {
        foreignKey: {
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  SectorExposure.init(
    {
      percent: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'SectorExposure',
    },
  );
  return SectorExposure;
};
