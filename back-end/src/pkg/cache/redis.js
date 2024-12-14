const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD || null,
});

const connectCache = async () => {
    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
            console.log('Redis connected successfully.');
        }
    } catch (error) {
        console.error('Failed to initialize Redis:', error);
        process.exit(1);
    }
};

module.exports = { redisClient, connectCache };
