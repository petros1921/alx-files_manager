// Import the redis package
import { createClient } from 'redis';

class RedisClient {
    constructor() {
        // Create a new Redis client
        this.client = createClient();

        // Handle error events
        this.client.on('error', (err) => console.error('Redis Client Error', err));

        // Connect to the Redis server
        this.client.connect().catch((err) => console.error('Failed to connect to Redis', err));
    }

    // Check if the Redis client is connected
    isAlive() {
        return this.client.isOpen;
    }

    // Get the value for a given key
    async get(key) {
        try {
            return await this.client.get(key);
        } catch (err) {
            console.error('Error getting value from Redis:', err);
            return null;
        }
    }

    // Set a value with a key and expiration duration
    async set(key, value, duration) {
        try {
            await this.client.set(key, value, {
                EX: duration,
            });
        } catch (err) {
            console.error('Error setting value in Redis:', err);
        }
    }

    // Delete a value for a given key
    async del(key) {
        try {
            await this.client.del(key);
        } catch (err) {
            console.error('Error deleting value from Redis:', err);
        }
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
