const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const router = require('./route');
const sequelize = require('./controllers/db');

const app = express();
app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Property Search API',
      version: '1.0.0',
      description: 'API for listing and searching properties with image overlays'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 1235}`
      }
    ]
  },
  apis: ['./src/route.js', './src/controllers/controller.js']
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', router);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 1235;

if (process.env.NODE_ENV !== 'test') {
  sequelize
    .authenticate()
    .then(() => {
      console.log('Database connected');
      app.listen(port, () => console.log(`API listening on port ${port}`));
    })
    .catch((err) => {
      console.error('Unable to connect to DB', err.message);
      process.exit(1);
    });
}

module.exports = app;
