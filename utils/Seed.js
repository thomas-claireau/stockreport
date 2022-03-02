const faker = require('@faker-js/faker').faker;

module.exports = class Seed {
  constructor(sequelize, test = false) {
    this.sequelize = sequelize;
    this.test = test;
  }

  async run() {
    try {
      await this.stockType();
      await this.stock();
      await this.movementType();
      await this.movement();
      await this.report();
    } catch (error) {
      console.log(error);
    }
  }

  async stockType() {
    try {
      const types = ['action', 'obligation', 'sicav', 'fcp'];
      const date = new Date().toISOString().substring(0, 10);

      const data = types.map(type => {
        return { name: type, createdAt: date, updatedAt: date };
      });

      if (this.test) {
        await this.sequelize.bulkCreate('StockTypes', data);
      } else {
        await this.sequelize.bulkInsert('StockTypes', data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async stock() {
    try {
      const stocks = 10; // number of fake stocks
      const data = [];

      for (let i = 0; i < stocks; i++) {
        const date = new Date();
        date.setDate(
          date.getDate() - faker.datatype.number({ min: i, max: stocks }),
        );
        const dateString = date.toISOString().substring(0, 10);

        data.push({
          name: faker.finance.currencyName(),
          code: 'PAASI',
          StockTypeId: faker.datatype.number({ min: 1, max: 4 }),
          qty: faker.datatype.number({ min: 1, max: 50 }),
          etf: faker.datatype.number({ min: 0, max: 1 }),
          pru: faker.datatype.float({ min: 0, max: 200 }) * 100,
          createdAt: dateString,
          updatedAt: dateString,
        });
      }

      if (this.test) {
        await this.sequelize.bulkCreate('Stocks', data);
      } else {
        await this.sequelize.bulkInsert('Stocks', data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async movementType() {
    try {
      const types = ['transfer', 'purchase', 'sale', 'dividend', 'split'];
      const date = new Date().toISOString().substring(0, 10);

      const data = types.map(type => {
        return { name: type, createdAt: date, updatedAt: date };
      });

      if (this.test) {
        await this.sequelize.bulkCreate('MovementTypes', data);
      } else {
        await this.sequelize.bulkInsert('MovementTypes', data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async movement() {
    const MONTHS = 2; // tests on 2 months
    const WEEKS = 4; // weeks in a month
    const DAYS = 5; // 5 days per weeks
    const HOURS = 10; // 10 hours per day (8h-18h)
    const STEPS = 2; // number of movements per hour;

    const MOVEMENTS = MONTHS * WEEKS * DAYS * HOURS * STEPS;

    const data = [];

    for (let i = 0; i < MOVEMENTS; i++) {
      const date = new Date();
      const randomDate = faker.datatype.datetime();
      const time = `${randomDate.getHours()}:${randomDate.getMinutes()}:${randomDate.getSeconds()}`;

      date.setDate(
        date.getDate() - faker.datatype.number({ min: 1, max: MOVEMENTS }),
      );
      const dateString = date.toISOString().substring(0, 10);

      const isTransfer = faker.datatype.boolean();
      const movement = {
        amount:
          faker.datatype.float({ min: 300, max: 600 }) *
          (faker.datatype.number({ min: 0, max: 1 }) ? 1 : -1) *
          100,
        createdAt: dateString + ' ' + time,
        updatedAt: dateString + ' ' + time,
      };

      if (isTransfer) {
        movement.MovementTypeId = 1; // transfer
      } else {
        movement.MovementTypeId = 2; // purchase
        movement.StockId = faker.datatype.number({ min: 1, max: 10 });
        movement.qty = faker.datatype.number({ min: 1, max: 10 });
        movement.live =
          faker.datatype.float({ min: 300, max: 600 }) *
          (faker.datatype.number({ min: 0, max: 1 }) ? 1 : -1) *
          100;
      }

      data.push(movement);
    }

    if (this.test) {
      await this.sequelize.bulkCreate('Movements', data);
    } else {
      await this.sequelize.bulkInsert('Movements', data);
    }
  }

  async report() {
    const MONTHS = 2; // tests on 2 months
    const WEEKS = 4; // weeks in a month
    const DAYS = 5; // 5 days per weeks
    const HOURS = 10; // 10 hours per day (8h-18h)
    const STEPS = 2; // number of movements per hour;

    const REPORTS = MONTHS * WEEKS * DAYS * HOURS * STEPS;

    const data = [];

    for (let i = 0; i < REPORTS; i++) {
      const date = new Date();
      date.setDate(
        date.getDate() - faker.datatype.number({ min: i, max: REPORTS }),
      );
      const dateString = date.toISOString().substring(0, 10);

      data.push({
        amount: faker.datatype.float({ min: 0, max: 200 }) * 100,
        StockId: faker.datatype.number({ min: 1, max: 10 }),
        createdAt: dateString,
        updatedAt: dateString,
      });
    }

    if (this.test) {
      await this.sequelize.bulkCreate('Reports', data);
    } else {
      await this.sequelize.bulkInsert('Reports', data);
    }
  }
};
