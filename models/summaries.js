'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class summaries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  summaries.init({
    value: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'summaries',
  });
  return summaries;
};