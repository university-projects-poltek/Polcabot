const { register, login } = require('../src/controllers/authcontroller');
const httpMocks = require('node-mocks-http');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../src/models', () => ({
    User: {
        findOne: jest.fn(),
        create: jest.fn()
    }
}));

const { User } = require('../src/models');

describe('Auth Controller', () => {
    describe('Register', () => {
        it('should return 400 if input is invalid', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: {
            name: '', email: '', username: '', password: '', confirmPassword: ''
            }
        });
        const res = httpMocks.createResponse();

        await register(req, res);
        expect(res.statusCode).toBe(400);
    });

    it('should register user and return token', async () => {
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({
            id: 1,
            name: 'Tester',
            email: 'tester@gmail.com',
            username: 'tester1',
            role: 'user'
        });

        const req = httpMocks.createRequest({
            method: 'POST',
            body: {
            name: 'Tester',
            email: 'tester@gmail.com',
            username: 'tester1',
            password: 'password123',
            confirmPassword: 'password123'
        }
        });
        const res = httpMocks.createResponse();

        await register(req, res);
        expect(res.statusCode).toBe(201);
        const data = res._getJSONData();
        expect(data.success).toBe(true);
        expect(data.token).toBeDefined();
    });
    });

  describe('Login', () => {
    it('should return 404 if user not found', async () => {
      User.findOne.mockResolvedValue(null);
      const req = httpMocks.createRequest({
        method: 'POST',
        body: { username: 'wronguser', password: 'wrongpass' }
      });
      const res = httpMocks.createResponse();

      await login(req, res);
      expect(res.statusCode).toBe(404);
    });

    it('should return 401 if password wrong', async () => {
      User.findOne.mockResolvedValue({
        username: 'tester',
        password: await bcrypt.hash('rightpass', 10)
      });

      const req = httpMocks.createRequest({
        method: 'POST',
        body: { username: 'tester', password: 'wrongpass' }
      });
      const res = httpMocks.createResponse();

      await login(req, res);
      expect(res.statusCode).toBe(401);
    });

    it('should login successfully and return token', async () => {
      const hashed = await bcrypt.hash('password123', 10);
      User.findOne.mockResolvedValue({
        id: 1,
        name: 'Tester',
        email: 'tester@gmail.com',
        username: 'tester',
        role: 'user',
        password: hashed
      });

      const req = httpMocks.createRequest({
        method: 'POST',
        body: { username: 'tester', password: 'password123' }
      });
      const res = httpMocks.createResponse();

      await login(req, res);
      expect(res.statusCode).toBe(200);
      const data = res._getJSONData();
      expect(data.token).toBeDefined();
    });
  });
});
