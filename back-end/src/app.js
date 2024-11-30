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
            origin: 'http://localhost:5173',  // Allow the frontend to access the backend
            methods: ['GET', 'POST', 'PUT', 'DELETE'],  // List of allowed HTTP methods
            allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers in the request
            credentials: true,  // Allow credentials (cookies, HTTP au
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