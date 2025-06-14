import request from 'supertest';
import app from '../../routes';
const { AppDataSource } = require('./path/to/your/data-source'); // Adjust the path as needed


describe('API Endpoints', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  test('GET /health returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('UP');
  });

  test('POST /register creates user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'test@lyncharea.com',
        password: 'Test123!'
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});