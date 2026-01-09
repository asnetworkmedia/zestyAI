const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'zesty',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'engineTest888',
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5555,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      useUTC: false
    },
    timezone: 'UTC'
  }
);

module.exports = sequelize;
