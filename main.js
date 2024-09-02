import dbClient from './utils/db.js';

// Helper function to create a promise-based timeout
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const waitConnection = async () => {
    let retries = 0;
    const maxRetries = 10;
    const retryInterval = 1000; // 1 second

    while (retries < maxRetries) {
        if (dbClient.isAlive()) {
            return; // Resolve if connected
        }

        retries++;
        console.log(`Retrying connection... Attempt ${retries}/${maxRetries}`);
        await sleep(retryInterval);
    }

    throw new Error('Failed to connect to the database after multiple attempts');
};

(async () => {
    try {
        console.log('Initial connection status:', dbClient.isAlive());
        await waitConnection();
        console.log('Final connection status:', dbClient.isAlive());
        console.log('Number of users:', await dbClient.nbUsers());
        console.log('Number of files:', await dbClient.nbFiles());
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
