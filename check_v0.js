const { MongoClient } = require('mongodb');
async function check() {
  const client = new MongoClient('mongodb://parwal101_db_user:Dp9009882499AA@ac-r7qql9f-shard-00-00.jz1abkr.mongodb.net:27017,ac-r7qql9f-shard-00-01.jz1abkr.mongodb.net:27017,ac-r7qql9f-shard-00-02.jz1abkr.mongodb.net:27017/ai_directory?ssl=true&replicaSet=atlas-ra077j-shard-0&authSource=admin&appName=DBAITOOL');
  await client.connect();
  const db = client.db('ai_directory');
  const tool = await db.collection('tools').findOne({ name: { $regex: /v0 by vercel/i } });
  console.log(tool ? JSON.stringify(tool, null, 2) : 'Not found');
  process.exit(0);
}
check();
