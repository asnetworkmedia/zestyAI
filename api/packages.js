module.exports = {
  runtime: [
    'express',
    'sequelize',
    'pg',
    'pg-hstore',
    'cors',
    'dotenv',
    'axios',
    'sharp',
    'swagger-jsdoc',
    'swagger-ui-express'
  ],
  dev: ['jest', 'supertest', 'nodemon', 'cross-env']
};
