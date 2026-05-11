const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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

async function restoreAdmin() {
    const uri = envVars.MONGO_URL;
    const dbName = envVars.DB_NAME || 'ai_directory';
    const userId = 'user_39IssNzp503XuafxZvJe4W1l8oh';
    
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection('users');
        
        const existing = await usersCollection.findOne({ userId });
        if (existing) {
            await usersCollection.updateOne({ userId }, { $set: { role: 'admin', updatedAt: new Date() } });
            console.log('✅ Admin status UPDATED for', userId);
        } else {
            await usersCollection.insertOne({
                _id: uuidv4(),
                userId,
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            });
            console.log('✅ Admin status CREATED for', userId);
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

restoreAdmin();
