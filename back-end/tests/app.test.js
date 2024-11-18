const request = require('supertest'); // Thư viện test HTTP
const express = require('express');
const { configureApp } = require('../src/app'); // Import hàm configureApp từ app.js
const { connectDatabase } = require('../src/pkg/db/mongo'); // Mock connectDatabase
const { startHttpServer } = require('../src/pkg/server/http'); // Mock startHttpServer

jest.mock('../src/pkg/db/mongo'); // Mock kết nối MongoDB
jest.mock('../src/pkg/server/http'); // Mock server HTTP

describe('App Endpoints', () => {
    let app;

    // Thiết lập ứng dụng trước khi chạy test
    beforeAll(() => {
        app = express();
        configureApp(app); // Cấu hình middleware và routes
    });

    test('GET /health should return 200 OK', async () => {
        const res = await request(app).get('/health'); // Gửi request tới /health
        expect(res.status).toBe(200); // Đảm bảo mã trạng thái là 200
        expect(res.body.message).toBe('OK'); // Đảm bảo trả về message "OK"
    });

    test('POST /example should return 201 Created', async () => {
        const payload = { name: 'Test User' }; // Dữ liệu giả để gửi request
        const res = await request(app).post('/example').send(payload); // Gửi POST request tới /example
        expect(res.status).toBe(201); // Đảm bảo mã trạng thái là 201
        expect(res.body.success).toBe(true); // Đảm bảo trả về success: true
    });

    test('GET /unknown should return 404 Not Found', async () => {
        const res = await request(app).get('/unknown'); // Gửi request tới route không tồn tại
        expect(res.status).toBe(404); // Đảm bảo mã trạng thái là 404
        expect(res.body.error).toBe('Not Found'); // Đảm bảo trả về lỗi "Not Found"
    });
});

