const express = require('express');
const cors = require('cors');
const startHttpServer = require('./pkg/server/http');
const connectDatabase = require('./pkg/db/mongo');
const initRoutes = require('./routes');
const { logMiddleware, logEndpoints} = require('./pkg/logger/log');  // Import log middleware

const port = process.env.PORT || 3000;
const app = express();

const configureApp = () => {
    app.use(logMiddleware);

    app.use(
        express.json(),
        cors({
            origin: '*',
            methods: '*',
            allowedHeaders: '*',
        })
    );
    initRoutes(app);
    logEndpoints(app);
};

const startApp = async () => {
    await connectDatabase();
    configureApp();
    startHttpServer(port, app);
};

startApp().catch((error) => {
    console.error('Failed to start the app:', error);
    process.exit(1);
});