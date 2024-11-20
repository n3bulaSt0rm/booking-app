const https = require('https');
const fs = require('fs');
const path = require('path');

const startHttpsServer = (port, app) => {
    const options = {
        key: fs.readFileSync(path.join(__dirname, '../../ssl/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '../../ssl/cert.pem')),
    };

    const server = https.createServer(options, app);

    server.listen(port, () => {
        console.log(`HTTPS Server running on port ${port}`);
    });
};

module.exports = startHttpsServer;