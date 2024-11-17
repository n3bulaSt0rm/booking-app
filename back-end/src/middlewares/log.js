const log = (req, res, next) => {
    const start = Date.now();

    console.log(`[${new Date().toISOString()}] - ${req.method} ${req.url} - Start`);

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] - ${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
    });

    next();
};

module.exports = log;