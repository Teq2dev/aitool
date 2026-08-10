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
    const toolsCollection = db.collection('tools');
    const reviewsCollection = db.collection('reviews');

    // Find all tools that have reviews
    const uniqueToolIds = await reviewsCollection.distinct('toolId', { status: 'approved' });
    console.log(`Found ${uniqueToolIds.length} tools with approved reviews. Recalculating stats...`);

    for (const toolIdStr of uniqueToolIds) {
      const stats = await reviewsCollection.aggregate([
        { $match: { toolId: String(toolIdStr), status: 'approved' } },
        {
          $group: {
            _id: '$toolId',
            averageRating: { $avg: '$rating' },
            totalVotes: { $sum: 1 }
          }
        }
      ]).toArray();

      const writtenStats = stats[0] || { averageRating: 0, totalVotes: 0 };
      
      const { ObjectId } = require('mongodb');
      const query = { $or: [{ _id: toolIdStr }, { _id: String(toolIdStr) }] };
      try {
        if (typeof toolIdStr === 'string' && toolIdStr.length === 24) {
          query.$or.push({ _id: new ObjectId(toolIdStr) });
        }
      } catch (e) {}

      const tool = await toolsCollection.findOne(query);
      if (!tool) continue;

      const baseVotes = tool.baseVotes || 150;
      const baseRating = tool.baseRating || 4.5;

      const writtenVotes = writtenStats.totalVotes;
      const writtenRatingSum = writtenStats.averageRating * writtenVotes;

      const finalVotes = baseVotes + writtenVotes;
      let finalRating = baseRating;
      
      if (finalVotes > 0) {
        finalRating = ((baseRating * baseVotes) + writtenRatingSum) / finalVotes;
      }

      await toolsCollection.updateOne(query, {
        $set: {
          rating: Number(finalRating.toFixed(1)),
          votes: finalVotes,
          updatedAt: new Date()
        }
      });
    }

    console.log('Recalculation complete.');

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
