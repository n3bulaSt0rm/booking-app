require('dotenv').config()
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;