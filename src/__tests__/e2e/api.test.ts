import request from 'supertest';

import pool from '../../db';
import { jest } from '@jest/globals';
import app from '../../routes';

type QueryResult = { rows: any[] };

const mockedPool = pool as unknown as { query: jest.Mock<any>; end: jest.Mock<any> };

jest.mock('../../db', () => ({
    query: jest.fn(),
    end: jest.fn()
}));

describe('API E2E Tests', () => {
    test('POST /register returns 201', async () => {
        mockedPool.query
            .mockResolvedValueOnce({ rows: [] }) // User doesn't exist
            .mockResolvedValueOnce({ rows: [{ id: 1 }] }); // User created

        const response = await request(app)
            .post('/register')
            .send({
                name: 'E2E Test User',
                mail: 'e2e@test.com',
                password: 'password123',
                role: 'user'
            });

        expect(response.status).toBe(201);
    });

    test('POST /login returns 200 with valid credentials', async () => {
        mockedPool.query
            .mockResolvedValueOnce({ 
                rows: [{ 
                    id: 1, 
                    name: 'Test User', 
                    email: 'test@test.com', 
                    password: '$2a$10$hashedpassword', 
                    role: 'user' 
                }] 
            });

        const response = await request(app)
            .post('/login')
            .send({
                mail: 'test@test.com',
                password: 'password123'
            });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});