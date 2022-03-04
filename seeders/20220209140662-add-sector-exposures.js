'use strict';

const Seed = require('../utils/Seed');

module.exports = {
  async up(queryInterface, Sequelize) {
    new Seed(queryInterface).sectorExposure();
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SectorExposures', null, {});
  },
};
