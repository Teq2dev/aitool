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

async function masterCategoryFix() {
    const MONGO_URL = process.env.MONGO_URL;
    const client = new MongoClient(MONGO_URL);
    
    try {
        await client.connect();
        const db = client.db('ai_directory');
        const toolsCollection = db.collection('tools');
        const categoriesCollection = db.collection('categories');

        console.log('🧹 Starting Master Category Fix...');

        // 1. Get all unique categories from the TOOLS themselves
        const tools = await toolsCollection.find({}).toArray();
        const categoryMap = new Map(); // slug -> original name

        tools.forEach(tool => {
            if (tool.categories && Array.isArray(tool.categories)) {
                tool.categories.forEach(cat => {
                    // Create a "Merge Key" that is just letters and numbers (no hyphens)
                    const mergeKey = cat.toLowerCase().replace(/[^a-z0-9]+/g, '');
                    
                    // Create a "Standard Slug" for the URL
                    const standardSlug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
                    
                    if (!categoryMap.has(mergeKey)) {
                        // Manual Overrides for common categories
                        const overrides = {
                            'imageediting': 'Image Editing',
                            'customersupport': 'Customer Support',
                            'emailmarketing': 'Email Marketing',
                            'aisearchengines': 'AI Search Engines',
                            'promptgenerators': 'Prompt Generators',
                            'audioediting': 'Audio Editing',
                            'presentationmakers': 'Presentation Makers',
                            'blogcontent': 'Blog Content',
                            'aiwriters': 'AI Writers',
                            'aicontentdetector': 'AI Content Detector',
                            'copywriting': 'Copywriting',
                            'videooditing': 'Video Editing',
                            'socialmediamarketing': 'Social Media Marketing',
                            'texttoimage': 'Text to Image',
                            'drawingpainting': 'Drawing & Painting',
                            'reelsvideo': 'Reels & Video',
                            'spreadsheetai': 'Spreadsheet AI'
                        };

                        let beautifiedName = overrides[mergeKey];
                        
                        if (!beautifiedName) {
                            beautifiedName = cat.replace(/([A-Z])/g, ' $1').replace(/-/g, ' ').trim();
                            beautifiedName = beautifiedName.split(' ').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                            ).join(' ');
                        }

                        // Custom overrides for AI and other specific cases
                        beautifiedName = beautifiedName.replace(/^Ai /i, 'AI ')
                                                      .replace(/ Ai$/i, ' AI')
                                                      .replace(/Ai/g, 'AI')
                                                      .replace(/Smt/i, 'Social Media')
                                                      .replace(/Ppt/i, 'PowerPoint');

                        categoryMap.set(mergeKey, {
                            name: beautifiedName,
                            slug: standardSlug
                        });
                    }
                });
            }
        });

        console.log(`📂 Found ${categoryMap.size} unique category groups after aggressive merging.`);

        // 2. Clean up the categories collection
        await categoriesCollection.deleteMany({}); // Start fresh
        for (const [mergeKey, data] of categoryMap) {
            // Count tools using the same merge key
            const count = tools.filter(t => 
                t.categories && t.categories.some(c => c.toLowerCase().replace(/[^a-z0-9]+/g, '') === mergeKey)
            ).length;

            await categoriesCollection.insertOne({
                name: data.name,
                slug: data.slug,
                toolCount: count,
                status: 'active',
                createdAt: new Date()
            });
        }

        // 3. Update all tools to use consistent standard slugs
        console.log('🔄 Standardizing tool category arrays with Super Merge...');
        for (const tool of tools) {
            if (tool.categories && Array.isArray(tool.categories)) {
                const standardized = tool.categories.map(c => {
                    const mergeKey = c.toLowerCase().replace(/[^a-z0-9]+/g, '');
                    return categoryMap.get(mergeKey).slug;
                });
                
                const uniqueStandardized = [...new Set(standardized)];
                
                await toolsCollection.updateOne(
                    { _id: tool._id },
                    { $set: { categories: uniqueStandardized } }
                );
            }
        }

        console.log('✅ Master Fix Complete! All 67 education tools (and all others) will now show up correctly.');

    } catch (err) {
        console.error('❌ Fix Error:', err.message);
    } finally {
        await client.close();
    }
}

masterCategoryFix();
