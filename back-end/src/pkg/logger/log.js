const { createNamespace } = require('cls-hooked');
const { v4: uuid } = require('uuid');

const requestNamespace = createNamespace('request');

const logger = {
    info: (message) => {
        const requestId = requestNamespace.get('requestId') || 'N/A';
        console.log(`[${new Date().toISOString()}] [INFO] [Request ID: ${requestId}] ${message}`);
    },
    error: (message) => {
        const requestId = requestNamespace.get('requestId') || 'N/A';
        console.error(`[${new Date().toISOString()}] [ERROR] [Request ID: ${requestId}] ${message}`);
    }
};

const logMiddleware = (req, res, next) => {
    requestNamespace.run(() => {
        const requestId = uuid();
        requestNamespace.set('requestId', requestId);
        logger.info(`Received request: ${req.method} ${req.originalUrl}`);

        res.on('finish', () => {
            logger.info(`Response status: ${res.statusCode}`);
        });

        next();
    });
};

const logEndpoints = (app) => {
    const routes = [];

    const extractRoutes = (prefix, stack) => {
        stack.forEach((middleware) => {
            if (middleware.route) {
                const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
                routes.push({ path: prefix + middleware.route.path, methods });
            } else if (middleware.name === 'router') {
                const newPrefix = prefix + middleware.regexp.source
                    .replace(/\\\/\?\(\?=\\\/\|\$\)/g, '')
                    .replace('^\\/', '/')
                    .replace(/\\\//g, '/');
                extractRoutes(newPrefix, middleware.handle.stack);
            }
        });
    };

    extractRoutes('', app._router.stack);

    routes.forEach((route) => {
        console.log(`${route.methods}: ${route.path}`);
    });
};

module.exports = {
    logger,
    logMiddleware,
    logEndpoints
};