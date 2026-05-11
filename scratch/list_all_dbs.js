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

async function listDbs() {
    const uri = envVars.MONGO_URL;
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const admin = client.db().admin();
        const dbs = await admin.listDatabases();
        console.log('Databases:', dbs.databases.map(db => db.name));
        
        for (const dbInfo of dbs.databases) {
            const db = client.db(dbInfo.name);
            const collections = await db.listCollections().toArray();
            console.log(`- ${dbInfo.name}:`, collections.map(c => c.name));
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

listDbs();
