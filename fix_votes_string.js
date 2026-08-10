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

    // Check string votes
    const stringVotes = await tools.find({ votes: { $type: "string" } }).toArray();
    console.log(`Found ${stringVotes.length} tools with string votes.`);
    
    let updated = 0;
    for (const tool of stringVotes) {
       const v = parseInt(tool.votes, 10);
       if (v > 350) {
           const newVotes = Math.floor(Math.random() * 310) + 30;
           await tools.updateOne({ _id: tool._id }, { $set: { votes: newVotes } });
           updated++;
       } else {
           // Convert back to number anyway
           await tools.updateOne({ _id: tool._id }, { $set: { votes: v || Math.floor(Math.random() * 310) + 30 } });
       }
    }
    console.log(`Randomized string votes for ${updated} tools > 350.`);
    
    // Let's also check for tools with > 1000 votes, or anything else
    const highVotes = await tools.find({ votes: { $gte: 350, $type: "number" } }).toArray();
    console.log(`Found ${highVotes.length} tools with number votes >= 350.`);
    
    for (const tool of highVotes) {
       const newVotes = Math.floor(Math.random() * 310) + 30;
       await tools.updateOne({ _id: tool._id }, { $set: { votes: newVotes } });
    }

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
