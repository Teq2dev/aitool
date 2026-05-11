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

async function checkReviews() {
    const uri = envVars.MONGO_URL;
    const dbName = envVars.DB_NAME || 'ai_directory';
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const reviews = await db.collection('reviews').find({}).limit(20).toArray();
        console.log('Sample Reviews:', JSON.stringify(reviews, null, 2));
        
        const tools = await db.collection('tools').find({}).limit(5).toArray();
        console.log('Sample Tools:', JSON.stringify(tools, null, 2));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

checkReviews();
