const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

function loadEnv() {
    const envPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const firstEqual = line.indexOf('=');
            if (firstEqual > 0) {
                const key = line.substring(0, firstEqual).trim();
                const value = line.substring(firstEqual + 1).trim();
                process.env[key] = value;
            }
        });
    }
}

loadEnv();

async function checkAdmins() {
    const uri = process.env.MONGO_URL;
    const dbName = process.env.DB_NAME || 'ai_directory';
    
    if (!uri) {
        console.error('MONGO_URL not found in .env.local');
        return;
    }

    console.log('Connecting to:', uri.replace(/:([^:@]+)@/, ':****@'));
    
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection('users');
        
        console.log('Fetching all users...');
        const allUsers = await usersCollection.find({}).toArray();
        console.log('Total users:', allUsers.length);
        console.log('Users:', JSON.stringify(allUsers, null, 2));
        
        const admins = await usersCollection.find({ role: 'admin' }).toArray();
        console.log('Admin Users:', JSON.stringify(admins, null, 2));
    } catch (err) {
        console.error('Database error:', err);
    } finally {
        await client.close();
    }
}

checkAdmins();
