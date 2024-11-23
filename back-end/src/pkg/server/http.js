const http = require('http');

const startHttpServer = (port, app) => {
    const server = http.createServer(app);

    server.listen(port, () => {
        console.log(`HTTP Server running on port ${port}`);
    });
};

module.exports = startHttpServer;