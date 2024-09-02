import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();

        this.client.on('error', (err) => {
            console.error(`Redis client not connected to the server: ${err.message}`);
        });

        this.client.on('connect', () => {
            console.log('Redis client connected to the server');
        });

        this.client.connect().catch((err) => {
            console.error(`Redis client connection error: ${err.message}`);
        });
    }

    isAlive() {
        return this.client.isReady;
    }

    async get(key) {
        try {
            const value = await this.client.get(key);
            return value;
        } catch (error) {
            console.error(`Error getting value from Redis: ${error.message}`);
            return null;
        }
    }

    async set(key, value, duration) {
        try {
            await this.client.setEx(key, duration, value);
        } catch (error) {
            console.error(`Error setting value in Redis: ${error.message}`);
        }
    }

    async del(key) {
        try {
            await this.client.del(key);
        } catch (error) {
            console.error(`Error deleting value from Redis: ${error.message}`);
        }
    }
}

const redisClient = new RedisClient();
export default redisClient;