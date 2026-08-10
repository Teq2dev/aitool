const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const mongoUriLine = envContent.split('\n').find(line => line.startsWith('MONGO_URL='));
const uri = mongoUriLine ? mongoUriLine.replace('MONGO_URL=', '').trim() : '';

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('ai_directory');
    const tools = db.collection('tools');

    // 1. Delete Koko AI
    const delRes = await tools.deleteOne({ slug: 'koko-ai' });
    console.log('Deleted Koko AI:', delRes.deletedCount);

    // 2. Clean [EN], [FR], etc. from all fullDescriptions
    const allTools = await tools.find({}).toArray();
    let updatedCount = 0;

    for (const tool of allTools) {
      if (!tool.translations) continue;
      
      let changed = false;
      const updatedTranslations = { ...tool.translations };
      
      for (const lang of Object.keys(updatedTranslations)) {
        if (updatedTranslations[lang] && updatedTranslations[lang].fullDescription) {
          // Remove things like [EN], [FR], etc. exactly at the start, or anywhere?
          // It's usually like: "[EN] Detailed analysis..."
          // Let's remove any pattern like `^\[[A-Z]{2}\]\s*`
          const regex = /^\[[A-Z]{2}\]\s*/i;
          const oldDesc = updatedTranslations[lang].fullDescription;
          
          if (regex.test(oldDesc)) {
            updatedTranslations[lang].fullDescription = oldDesc.replace(regex, '');
            changed = true;
          }
        }
      }
      
      if (changed) {
        await tools.updateOne({ _id: tool._id }, { $set: { translations: updatedTranslations } });
        updatedCount++;
      }
    }
    
    console.log(`Cleaned language prefixes from ${updatedCount} tools.`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
