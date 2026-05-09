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

async function forceUpdate() {
    const client = new MongoClient(process.env.MONGO_URL);
    try {
        await client.connect();
        const db = client.db('ai_directory');
        const col = db.collection('categories');
        
        const overrides = {
            'imageediting': 'Image Editing',
            'customersupport': 'Customer Support',
            'emailmarketing': 'Email Marketing',
            'aisearchengines': 'AI Search Engines',
            'promptgenerators': 'Prompt Generators',
            'audioediting': 'Audio Editing',
            'presentationmakers': 'Presentation Makers',
            'blogcontent': 'Blog Content',
            'blog-content': 'Blog Content',
            'education': 'Education',
            'texttoimage': 'Text to Image',
            'seo': 'SEO',
            'aiwriters': 'AI Writers',
            'ai-writers': 'AI Writers',
            'socialmediamarketing': 'Social Media Marketing',
            'text-to-image': 'Text to Image',
            'drawing-painting': 'Drawing & Painting',
            'reels-video': 'Reels & Video',
            'spreadsheet-ai': 'Spreadsheet AI'
        };

        console.log('🚀 Forcing beautiful names into Database...');

        for (const [slug, name] of Object.entries(overrides)) {
            const result = await col.updateOne(
                { slug: slug },
                { $set: { name: name } }
            );
            if (result.matchedCount > 0) {
                console.log(`✅ Updated: ${slug} ➔ ${name}`);
            }
        }
        
        // Also do a general capitalization for everything else
        const others = await col.find({}).toArray();
        for (const cat of others) {
            if (!overrides[cat.slug]) {
                const beautified = cat.name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
                await col.updateOne({ _id: cat._id }, { $set: { name: beautified } });
                console.log(`✨ Auto-Beautified: ${cat.slug} ➔ ${beautified}`);
            }
        }

        console.log('🎉 Database is now 100% beautiful!');
    } finally {
        await client.close();
    }
}

forceUpdate();
