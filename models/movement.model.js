'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Movement.belongsTo(models.MovementType, {
        foreignKey: {
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      models.Movement.belongsTo(models.Stock, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  }
  Movement.init(
    {
      qty: {
        type: DataTypes.INTEGER,
      },
      live: {
        type: DataTypes.FLOAT,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Movement',
    },
  );

  return Movement;
};
