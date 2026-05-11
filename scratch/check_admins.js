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
    const uri = process.env.MONGO_URL || 'mongodb://localhost:27017';
    const dbName = process.env.DB_NAME || 'ai_directory';
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection('users');
        
        const admins = await usersCollection.find({ role: 'admin' }).toArray();
        console.log('Admin Users:', JSON.stringify(admins, null, 2));
        
        const userByEmail = await usersCollection.findOne({ email: 'parwal111@gmail.com' });
        console.log('User by email:', JSON.stringify(userByEmail, null, 2));
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

checkAdmins();
