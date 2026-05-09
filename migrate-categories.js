const { MongoClient } = require('mongodb');
const axios = require('axios');
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

async function migrateCategories() {
    const MONGO_URL = process.env.MONGO_URL;
    const client = new MongoClient(MONGO_URL);
    
    try {
        await client.connect();
        const db = client.db('ai_directory');
        const categoriesCollection = db.collection('categories');
        const toolsCollection = db.collection('tools');

        console.log('📥 Fetching categories from live site...');
        const response = await axios.get('https://www.bestaitoolsfree.com/api/categories');
        const liveCategories = response.data.categories || response.data;
        
        console.log(`📦 Found ${liveCategories.length} categories.`);

        for (const cat of liveCategories) {
            // Ensure category has a slug
            if (!cat.slug && cat.name) {
                cat.slug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            }
            
            const { _id, ...updateData } = cat;
            await categoriesCollection.updateOne(
                { slug: cat.slug },
                { $set: updateData },
                { upsert: true }
            );
        }

        console.log('✅ Categories migrated successfully!');

        // Optional: Re-sync tool categories to match slugs
        console.log('🔄 Syncing tool category references...');
        const tools = await toolsCollection.find({}).toArray();
        for (const tool of tools) {
            if (tool.categories && Array.isArray(tool.categories)) {
                const cleanedCategories = tool.categories.map(c => c.trim());
                await toolsCollection.updateOne(
                    { _id: tool._id },
                    { $set: { categories: cleanedCategories } }
                );
            }
        }
        console.log('✅ Tool categories synced!');

    } catch (err) {
        console.error('❌ Category Migration Error:', err.message);
    } finally {
        await client.close();
    }
}

migrateCategories();
