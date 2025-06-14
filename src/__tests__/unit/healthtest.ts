import request from 'supertest';
import app from '../../routes';


describe('Health Check', () => {
  it('GET /health deve retornar 200', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'UP' });
  });
});