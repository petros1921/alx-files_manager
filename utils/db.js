import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || '27017';
        const database = process.env.DB_DATABASE || 'files_manager';
        const url = `mongodb://${host}:${port}`;

        this.client = new MongoClient(url);

        this.client.connect()
            .then(() => {
                this.db = this.client.db(database);
                console.log('MongoDB client connected to the server');
            })
            .catch((err) => {
                console.error(`MongoDB connection error: ${err.message}`);
                this.db = null;
            });
    }

    isAlive() {
        return this.client && this.client.topology && this.client.topology.isConnected();
    }

    async nbUsers() {
        if (!this.db) {
            console.error('Cannot count users, database not initialized');
            return 0;
        }
        try {
            return await this.db.collection('users').countDocuments();
        } catch (error) {
            console.error(`Error counting users: ${error.message}`);
            return 0;
        }
    }

    async nbFiles() {
        if (!this.db) {
            console.error('Cannot count files, database not initialized');
            return 0;
        }
        try {
            return await this.db.collection('files').countDocuments();
        } catch (error) {
            console.error(`Error counting files: ${error.message}`);
            return 0;
        }
    }
}

const dbClient = new DBClient();
export default dbClient;