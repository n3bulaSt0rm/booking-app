require('dotenv').config()
const express = require('express');
const cors = require('cors');
const startHttpServer = require("./pkg/server/http");
const connectDatabase = require('./pkg/db/mongo');
const {connectCache} = require('./pkg/cache/redis');
const { logMiddleware, logEndpoints} = require('./pkg/logger/log');
const initRoutes = require('./routes');

const port = process.env.PORT || 8080;
const app = express();

const configureApp = () => {
    app.use(logMiddleware);

    app.use(
        express.json(),
        cors({
            origin: (origin, callback) => {
                callback(null, true);
            },
            credentials: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        })
    );
    initRoutes(app);
    logEndpoints(app);
};

const startApp = async () => {
    await connectCache();
    await connectDatabase();
    configureApp();
    startHttpServer(port, app);
};

startApp().catch((error) => {
    console.error('Failed to start the app:', error);
    process.exit(1);
});