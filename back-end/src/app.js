require('dotenv').config()
const express = require('express');
const cors = require('cors');
const startHttpServer = require("./pkg/server/http");
const connectDatabase = require('./pkg/db/mongo');
const { logMiddleware, logEndpoints} = require('./pkg/logger/log');
const initRoutes = require('./routes');

const port = process.env.PORT || 3000;
const app = express();

const configureApp = () => {
    app.use(logMiddleware);

    app.use(
        express.json(),
        cors({
            // origin: '*',
            // methods: '*',
            // allowedHeaders: '*',
            origin: 'http://localhost:3005',  // Specify the front-end origin
            methods: 'GET,POST,PUT,DELETE',  // Specify allowed HTTP methods
            allowedHeaders: 'Content-Type,Authorization', // Specify allowed headers
            credentials: true,  // Allow cookies and credentials to be sent
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