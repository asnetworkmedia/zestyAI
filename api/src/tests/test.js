const request = require('supertest');
const app = require('../index');
const sequelize = require('../controllers/db');

beforeAll(async () => {
  await sequelize.authenticate();
});

test('GET /properties returns a list of properties', async () => {
  const res = await request(app).get('/properties');
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test('POST /find returns property IDs nearby a point', async () => {
  const res = await request(app)
    .post('/find')
    .send({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-80.0782213, 26.8849731]
      },
      'x-distance': 2000
    });

  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

test('GET /display/:id returns an image/jpeg', async () => {
  const sampleId = 'f853874999424ad2a5b6f37af6b56610';
  const res = await request(app).get(`/display/${sampleId}`);
  expect(res.status).toBe(200);
  expect(res.headers['content-type']).toContain('image');
});

afterAll(async () => {
  await sequelize.close();
});
