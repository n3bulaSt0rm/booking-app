const express = require('express');
const connectDatabase = require('./config/database');
const cors = require('cors');
const log = require('./middlewares/log');
const initRoutes = require('./routes');

const app = express();

connectDatabase();

app.use(
    express.json(),
    log,
    cors({
        origin: '*',
        methods: '*',
        allowedHeaders: '*',
    })
);

initRoutes(app);

module.exports = app;