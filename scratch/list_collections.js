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

async function listCollections() {
    const uri = envVars.MONGO_URL;
    const dbName = envVars.DB_NAME || 'ai_directory';
    
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const collections = await db.listCollections().toArray();
        console.log('Collections in', dbName, ':', collections.map(c => c.name));
        
        for (const col of collections) {
            const count = await db.collection(col.name).countDocuments();
            console.log(`- ${col.name}: ${count} documents`);
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

listCollections();
