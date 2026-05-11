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

async function createIndexes() {
    const uri = envVars.MONGO_URL;
    const dbName = envVars.DB_NAME || 'ai_directory';
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        
        console.log('🚀 Creating performance indexes for "tools"...');
        const tools = db.collection('tools');
        await tools.createIndex({ slug: 1 }, { unique: true });
        await tools.createIndex({ status: 1, createdAt: -1 });
        await tools.createIndex({ categories: 1 });
        await tools.createIndex({ featured: 1, trending: 1 });
        await tools.createIndex({ name: "text", shortDescription: "text", description: "text" });
        
        console.log('🚀 Creating performance indexes for "reviews"...');
        const reviews = db.collection('reviews');
        await reviews.createIndex({ toolId: 1, status: 1 });
        await reviews.createIndex({ createdAt: -1 });

        console.log('✅ All critical performance indexes created!');
    } catch (err) {
        console.error('❌ Error creating indexes:', err.message);
    } finally {
        await client.close();
    }
}

createIndexes();
