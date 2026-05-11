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

async function checkAdmins() {
    const uri = envVars.MONGO_URL;
    const dbName = envVars.DB_NAME || 'ai_directory';
    
    if (!uri) {
        console.error('MONGO_URL not found');
        return;
    }

    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection('users');
        
        console.log('--- ADMIN USERS ---');
        const admins = await usersCollection.find({ role: 'admin' }).toArray();
        console.log(JSON.stringify(admins, null, 2));
        
        console.log('--- ALL USERS ---');
        const all = await usersCollection.find({}).toArray();
        console.log(JSON.stringify(all, null, 2));
        
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

checkAdmins();
