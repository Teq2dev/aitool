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
    const reviews = db.collection('reviews');

    // 1. Fix missing status: 'approved' on the reviews we just inserted
    console.log('Fixing review statuses...');
    const result = await reviews.updateMany(
      { status: { $exists: false } },
      { $set: { status: 'approved' } }
    );
    console.log(`Updated ${result.modifiedCount} reviews to be approved.`);

    // 2. Randomize the `votes` field for tools that have suspicious fake counts
    // The user complained they are all 400-500. Let's vary them to be between 20 and 400.
    console.log('Randomizing votes for tools to look more natural...');
    
    // We can just randomize the votes for ALL tools, or specifically the ones that have between 400 and 600
    const toolsToUpdate = await tools.find({ votes: { $gte: 350 } }).toArray();
    
    let updatedCount = 0;
    for (const tool of toolsToUpdate) {
      // Generate a natural looking random number like 58, 231, 97, 329
      // We will make the range between 30 and 340
      const newVotes = Math.floor(Math.random() * 310) + 30;
      
      await tools.updateOne(
        { _id: tool._id },
        { $set: { votes: newVotes } }
      );
      updatedCount++;
    }
    
    console.log(`Randomized votes for ${updatedCount} tools.`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
