const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || "mongodb+srv://test:test12345@cluster0.bquyl.mongodb.net/aitools?retryWrites=true&w=majority";

async function checkBlogs() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const blogsCollection = db.collection('blogs');
    const blogs = await blogsCollection.find({}).toArray();
    console.log('Total blogs count in DB:', blogs.length);
    console.log('Blogs in DB:', JSON.stringify(blogs, null, 2));
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

checkBlogs();
