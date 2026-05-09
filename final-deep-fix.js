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

async function deepFix() {
    const client = new MongoClient(process.env.MONGO_URL);
    try {
        await client.connect();
        const admin = client.db().admin();
        const dbs = await admin.listDatabases();
        console.log('🔍 Found databases:', dbs.databases.map(d => d.name));

        const iconMap = {
            'imageediting': '🖼️', 'customersupport': '🎧', 'education': '🎓', 'ai-tool': '🛠️', 
            'texttoimage': '🎨', 'emailmarketing': '📧', 'aisearchengines': '🔍', 'seo': '📈', 
            'promptgenerators': '📝', 'audioediting': '🎙️', 'aiwriters': '✍️', 
            'presentationmakers': '📊', 'drawingpainting': '🖌️', 'blogcontent': '📰', 
            'reels-video': '📱', 'spreadsheet-ai': '🗓️', 'ai-content-detector': '🛡️', 
            'grammarcheck': '✍️', 'copywriting': '🖋️', 'videooditing': '🎬', 
            'socialmediamarketing': '🤳', 'designing': '📐', 'business': '💼',
            'texttospeech': '🗣️', 'digital-marketing': '📊', 'text-to-video': '📹',
            'scriptwriting': '📜', 'websitebuilder': '🌐', 'funtools': '🎢',
            'socialmedia': '🤳', 'resumewriting': '📄', 'tweetgeneration': '🐦',
            'texttovideos': '📹', 'name-generators': '🏷️', 'logo-generator': '🎨',
            'blog-to-video': '🎥', 'grammar-check': '✍️', 'paraphrase': '🔄',
            'website-builder': '🌐', 'social-media': '📱', 'designing': '🎨',
            'students': '🎒', 'teachers': '👩‍🏫', 'hr': '👥', 'sales': '💰',
            'gaming': '🎮', 'productivity': '⚡', 'dev-tools': '💻',
            'ui-ux-designers': '🎨', 'story-generation': '📚', 'marketing': '📢',
            'reels-short-videos': '📱', 'aicontentdetector': '🛡️'
        };

        const overrides = {
            'imageediting': 'Image Editing', 'customersupport': 'Customer Support', 
            'emailmarketing': 'Email Marketing', 'aisearchengines': 'AI Search Engines', 
            'promptgenerators': 'Prompt Generators', 'audioediting': 'Audio Editing', 
            'presentationmakers': 'Presentation Makers', 'blogcontent': 'Blog Content', 
            'education': 'Education', 'seo': 'SEO', 'aiwriters': 'AI Writers'
        };

        for (const dbInfo of dbs.databases) {
            if (['admin', 'local', 'config'].includes(dbInfo.name)) continue;
            
            const db = client.db(dbInfo.name);
            const collections = await db.listCollections().toArray();
            
            if (collections.some(c => c.name === 'categories')) {
                console.log(`🚀 Updating Categories in Database: ${dbInfo.name}`);
                const col = db.collection('categories');
                
                const cats = await col.find({}).toArray();
                for (const cat of cats) {
                    const slug = cat.slug;
                    const newName = overrides[slug] || cat.name;
                    const newIcon = iconMap[slug] || '🤖';
                    
                    // Force the name to be beautified if not in overrides
                    const finalName = overrides[slug] || newName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

                    await col.updateOne(
                        { _id: cat._id },
                        { $set: { name: finalName, icon: newIcon } }
                    );
                }
                console.log(`✅ ${dbInfo.name} is now 100% updated with beautiful names and icons.`);
            }
        }
    } finally {
        await client.close();
    }
}

deepFix();
