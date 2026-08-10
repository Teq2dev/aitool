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

    // get a sample of 5 new tools
    const sample = await tools.find({}).sort({ createdAt: -1 }).limit(5).toArray();
    console.log("Latest 5 tools votes:");
    sample.forEach(t => console.log(`${t.name}: ${t.votes}`));

    // get max votes of all tools
    const maxVotesTool = await tools.find({}).sort({ votes: -1 }).limit(5).toArray();
    console.log("\nTop 5 tools by votes:");
    maxVotesTool.forEach(t => console.log(`${t.name}: ${t.votes}`));

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
