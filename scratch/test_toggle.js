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

async function testToggle() {
    const uri = envVars.MONGO_URL;
    const dbName = envVars.DB_NAME || 'ai_directory';
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const tools = db.collection('tools');
        
        // Find an approved tool
        const tool = await tools.findOne({ status: 'approved' });
        if (!tool) {
            console.log('No approved tool found');
            return;
        }
        
        console.log('Tool before toggle:', tool.name, 'Featured:', tool.featured);
        
        // Simulate the toggle
        const newFeatured = !tool.featured;
        const result = await tools.updateOne(
            { _id: tool._id },
            { $set: { featured: newFeatured } }
        );
        
        console.log('Update result:', result.modifiedCount);
        
        const updatedTool = await tools.findOne({ _id: tool._id });
        console.log('Tool after toggle:', updatedTool.name, 'Featured:', updatedTool.featured);
        
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

testToggle();
