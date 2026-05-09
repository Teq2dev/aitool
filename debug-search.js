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

async function debugSearch() {
  console.log('--- SEARCH DIAGNOSTIC START ---');
  console.log('Connecting to MongoDB...');
  const client = new MongoClient(process.env.MONGO_URL);
  
  try {
    await client.connect();
    const db = client.db('ai_directory');
    const col = db.collection('tools');
    
    console.log('Testing Atlas Search with Index: "Aitools"');
    try {
      const results = await col.aggregate([
        {
          $search: {
            index: 'Aitools',
            autocomplete: {
              query: 'lo',
              path: 'name'
            }
          }
        },
        { $limit: 5 }
      ]).toArray();
      
      console.log('✅ SUCCESS! Found ' + results.length + ' results.');
      results.forEach(r => console.log(' - ' + r.name));
    } catch (searchErr) {
      console.error('❌ SEARCH ERROR: ' + searchErr.message);
      
      console.log('\nTrying fallback "default" index...');
      try {
        const fallback = await col.aggregate([
          {
            $search: {
              index: 'default',
              text: { query: 'lo', path: 'name' }
            }
          },
          { $limit: 1 }
        ]).toArray();
        console.log('✅ Fallback "default" index works!');
      } catch (fallbackErr) {
        console.error('❌ Fallback "default" also failed: ' + fallbackErr.message);
      }
    }
  } catch (err) {
    console.error('❌ CONNECTION ERROR: ' + err.message);
  } finally {
    await client.close();
    console.log('--- DIAGNOSTIC END ---');
  }
}

debugSearch();
