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

async function updateIcons() {
    const client = new MongoClient(process.env.MONGO_URL);
    try {
        await client.connect();
        const db = client.db('ai_directory');
        const col = db.collection('categories');
        
        const iconMap = {
            'image-editing': '🖼️',
            'imageediting': '🖼️',
            'customer-support': '🎧',
            'customersupport': '🎧',
            'education': '🎓',
            'ai-tool': '🛠️',
            'text-to-image': '🎨',
            'texttoimage': '🎨',
            'email-marketing': '📧',
            'emailmarketing': '📧',
            'ai-search-engines': '🔍',
            'aisearchengines': '🔍',
            'seo': '📈',
            'prompt-generators': '📝',
            'promptgenerators': '📝',
            'audio-editing': '🎙️',
            'audioediting': '🎙️',
            'ai-writers': '✍️',
            'aiwriters': '✍️',
            'presentation-makers': '📊',
            'presentationmakers': '📊',
            'drawing-painting': '🖌️',
            'drawingpainting': '🖌️',
            'paraphrase': '🔄',
            'marketing': '📢',
            'blog-content': '📰',
            'blogcontent': '📰',
            'reels-video': '📱',
            'reels-short-videos': '📱',
            'spreadsheet-ai': '🗓️',
            'spreadsheets': '🗓️',
            'ai-content-detector': '🛡️',
            'grammar-check': '✍️',
            'grammarcheck': '✍️',
            'copywriting': '🖋️',
            'copy-writing': '🖋️',
            'video-editing': '🎬',
            'videooditing': '🎬',
            'social-media': '🤳',
            'designing': '📐',
            'business': '💼',
            'students': '🎒',
            'teachers': '👩‍🏫',
            'hr': '👥',
            'sales': '💰',
            'gaming': '🎮',
            'productivity': '⚡',
            'dev-tools': '💻',
            'ui-ux-designers': '🎨',
            'website-builder': '🌐',
            'story-generation': '📚'
        };

        console.log('🚀 Updating Category Icons...');

        const categories = await col.find({}).toArray();
        for (const cat of categories) {
            const icon = iconMap[cat.slug] || '🤖';
            await col.updateOne(
                { _id: cat._id },
                { $set: { icon: icon } }
            );
            console.log(`✅ Updated ${cat.name}: ${icon}`);
        }

        console.log('🎉 All categories now have unique icons!');
    } finally {
        await client.close();
    }
}

updateIcons();
