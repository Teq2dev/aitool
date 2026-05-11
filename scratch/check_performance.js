const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const env = fs.readFileSync(envPath, 'utf8');
const lines = env.split(/\r?\n/);
const envVars = {};
for (const line of lines) {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
    }
}

async function checkIndexes() {
    const uri = envVars.MONGO_URL;
    const dbName = envVars.DB_NAME || 'ai_directory';
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        
        console.log('--- INDEXES FOR tools ---');
        const toolsIndexes = await db.collection('tools').indexes();
        console.log(JSON.stringify(toolsIndexes, null, 2));
        
        console.log('--- INDEXES FOR reviews ---');
        const reviewsIndexes = await db.collection('reviews').indexes();
        console.log(JSON.stringify(reviewsIndexes, null, 2));

        console.log('--- DB STATS ---');
        const stats = await db.command({ dbStats: 1 });
        console.log(JSON.stringify(stats, null, 2));
        
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

checkIndexes();
