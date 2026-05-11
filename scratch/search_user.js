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

async function searchUser() {
    const uri = envVars.MONGO_URL;
    const dbName = envVars.DB_NAME || 'ai_directory';
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const searchString = 'parwal111';
        
        console.log(`Searching for "${searchString}" across all collections...`);
        const collections = await db.listCollections().toArray();
        
        for (const col of collections) {
            const results = await db.collection(col.name).find({
                $or: [
                    { email: { $regex: searchString, $options: 'i' } },
                    { userName: { $regex: searchString, $options: 'i' } },
                    { userId: { $regex: searchString, $options: 'i' } },
                    { name: { $regex: searchString, $options: 'i' } }
                ]
            }).toArray();
            
            if (results.length > 0) {
                console.log(`Found ${results.length} results in ${col.name}:`);
                console.log(JSON.stringify(results, null, 2));
            }
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

searchUser();
