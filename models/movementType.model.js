'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovementType extends Model {
    static TRANSFER = 'transfer';
    static PURCHASE = 'purchase';

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MovementType.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'MovementType',
    },
  );
  return MovementType;
};
