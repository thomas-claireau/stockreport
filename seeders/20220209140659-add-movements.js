'use strict';

const Seed = require('../utils/Seed');

module.exports = {
  async up(queryInterface, Sequelize) {
    new Seed(queryInterface).movement();
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movements', null, {});
  },
};
