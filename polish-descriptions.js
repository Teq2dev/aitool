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

async function polish() {
    const MONGO_URL = process.env.MONGO_URL;
    const client = new MongoClient(MONGO_URL);
    
    try {
        await client.connect();
        const db = client.db('ai_directory');
        const toolsCollection = db.collection('tools');
        
        const tools = await toolsCollection.find({}).toArray();
        console.log(`✨ Polishing ${tools.length} tools...`);

        let count = 0;
        for (const tool of tools) {
            if (tool.description && tool.description.length > 20) {
                // Improved sentence splitting to handle .ai, .com, etc.
                let firstSentence = tool.description.split('. ').shift();
                if (!firstSentence.endsWith('.')) firstSentence += '.';
                
                await toolsCollection.updateOne(
                    { _id: tool._id },
                    { $set: { shortDescription: firstSentence } }
                );
                count++;
            }
        }
        
        console.log(`✅ Success! ${count} tools have been polished with matching high-quality short descriptions.`);
    } catch (err) {
        console.error('❌ Polishing error:', err.message);
    } finally {
        await client.close();
    }
}

polish();
