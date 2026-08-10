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

    const allTools = await tools.find({}).toArray();
    let updatedCount = 0;

    for (const tool of allTools) {
      if (tool.baseVotes === undefined) {
        // Generate a random base votes between 30 and 340
        const baseVotes = Math.floor(Math.random() * 310) + 30;
        // Generate a random base rating between 4.0 and 5.0
        const baseRating = Number((Math.random() * 1 + 4).toFixed(1));

        await tools.updateOne(
          { _id: tool._id },
          { $set: { baseVotes, baseRating } }
        );
        updatedCount++;
      }
    }

    console.log(`Set base stats for ${updatedCount} tools.`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
