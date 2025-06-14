import { register } from '../../controllers/registerController';
import { Request, Response } from 'express';
import pool from '../../db';
import bcrypt from 'bcryptjs';

jest.mock('../db');
jest.mock('bcryptjs');

describe('Controlador de Registro', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;

    beforeEach(() => {
        mockReq = {
            body: {
                name: 'Teste',
                mail: 'teste@teste.com',
                password: 'senha123',
                role: 'user'
            }
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('registra novo usuário com sucesso', async () => {
        (pool.query as jest.Mock)
            .mockResolvedValueOnce({ rows: [] })
            .mockResolvedValueOnce({
                rows: [{ id: 1, name: 'Teste', email: 'teste@teste.com', password: 'hash', role: 'user' }]
            });

        (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
        (bcrypt.hash as jest.Mock).mockResolvedValue('hash');

        await register(mockReq as Request, mockRes as Response);
        
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalled();
    });
});