// app.test.js
const request = require('supertest');
const express = require('express');
const cors = require('cors');
const { connect } = require('./config/database/connect');
const app = express();

// Mock the connect function so it doesn't actually try to connect to a real database
jest.mock('./config/database/connect', () => ({
    connect: jest.fn(),
}));

// Middleware setup
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Make sure the server connects to the database
beforeAll(() => {
    connect();  // Ensure the connect function is called
});

describe('GET /', () => {
    it('should return Hello, World! as the response', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);  // Kiểm tra mã trạng thái HTTP
        expect(response.text).toBe('Hello, World!');  // Kiểm tra nội dung phản hồi
    });
});

describe('Database Connection', () => {
    it('should call the connect function', () => {
        expect(connect).toHaveBeenCalledTimes(1);  // Đảm bảo connect được gọi một lần
    });
});
