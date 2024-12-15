const { redisClient } = require('../../pkg/cache/redis');

//TODO: thử nếu chỉ export ra connection

class Cache {
    async set(key, value, expiry) {
        try {
            await redisClient.set(key, value, {
                EX: expiry,
            });
        } catch (error) {
            console.error(`Redis SET Error for key: ${key}`, error);
            throw error;
        }
    }

    async get(key) {
        try {
            return await redisClient.get(key);
        } catch (error) {
            console.error(`Redis GET Error for key: ${key}`, error);
            throw error;
        }
    }

    async del(key) {
        try {
            await redisClient.del(key);
        } catch (error) {
            console.error(`Redis DEL Error for key: ${key}`, error);
            throw error;
        }
    }
}

module.exports = new Cache();
