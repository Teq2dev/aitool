const { MongoClient, ObjectId } = require('mongodb');
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

async function checkIdType() {
    const uri = envVars.MONGO_URL;
    const dbName = envVars.DB_NAME || 'ai_directory';
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const tools = db.collection('tools');
        
        const tool = await tools.findOne({});
        if (tool) {
            console.log('Tool ID:', tool._id);
            console.log('Type of _id:', typeof tool._id);
            console.log('Is ObjectId:', tool._id instanceof ObjectId);
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

checkIdType();
