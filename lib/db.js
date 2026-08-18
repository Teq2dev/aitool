import { MongoClient } from 'mongodb';

function getNormalizedMongoUri(rawUri) {
  if (!rawUri) return 'mongodb://localhost:27017';
  // Cloudflare Workers runtime cannot resolve DNS SRV records (_mongodb._tcp)
  // Transparently convert SRV cluster URI to standard direct replica set hosts
  if (rawUri.startsWith('mongodb+srv://') && rawUri.includes('dbaitool.jz1abkr.mongodb.net')) {
    const match = rawUri.match(/^mongodb\+srv:\/\/([^@]+)@/);
    if (match) {
      const userPass = match[1];
      return `mongodb://${userPass}@ac-r7qql9f-shard-00-00.jz1abkr.mongodb.net:27017,ac-r7qql9f-shard-00-01.jz1abkr.mongodb.net:27017,ac-r7qql9f-shard-00-02.jz1abkr.mongodb.net:27017/?ssl=true&replicaSet=atlas-ra077j-shard-0&authSource=admin`;
    }
  }
  return rawUri;
}

const rawUri = process.env.MONGO_URL || 'mongodb://localhost:27017';
const uri = getNormalizedMongoUri(rawUri);
const dbName = process.env.DB_NAME || 'ai_directory';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  const currentUri = getNormalizedMongoUri(process.env.MONGO_URL);
  const currentDbName = process.env.DB_NAME || 'ai_directory';

  if (!cached.promise) {
    const opts = {
      maxPoolSize: 100,
      minPoolSize: 0,
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    };

    cached.promise = MongoClient.connect(currentUri, opts).then((client) => {
      return {
        client,
        db: client.db(currentDbName),
      };
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ Connected to MongoDB');
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}

export async function getCollection(collectionName) {
  const { db } = await connectToDatabase();
  return db.collection(collectionName);
}