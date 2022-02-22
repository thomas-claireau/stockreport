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
      models.Stock.belongsTo(models.StockType, {
        foreignKey: {
          allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

      Stock.hasOne(models.Report);
      Stock.hasOne(models.Movement);
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
      etf: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      pru: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Stock',
    },
  );
  return Stock;
};
