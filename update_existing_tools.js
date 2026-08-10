const { MongoClient } = require('mongodb');
const fs = require('fs');

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function updateTools() {
  const uri = "mongodb://parwal101_db_user:Dp9009882499AA@ac-r7qql9f-shard-00-00.jz1abkr.mongodb.net:27017,ac-r7qql9f-shard-00-01.jz1abkr.mongodb.net:27017,ac-r7qql9f-shard-00-02.jz1abkr.mongodb.net:27017/ai_directory?ssl=true&replicaSet=atlas-ra077j-shard-0&authSource=admin&appName=DBAITOOL";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('ai_directory');
    const toolsCollection = db.collection('tools');
    
    const toolsData = JSON.parse(fs.readFileSync('tools_to_add.json', 'utf8'));
    console.log(`Loaded ${toolsData.length} tools to process updates.`);
    
    let updated = 0;

    for (const data of toolsData) {
      const slug = slugify(data.name);
      
      let hostname = '';
      try {
        hostname = new URL(data.website).hostname;
      } catch (e) {
        hostname = data.website.replace(/^https?:\/\//, '').split('/')[0];
      }
      
      const properLogo = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
      
      const result = await toolsCollection.updateOne(
        { slug: slug },
        { 
          $set: { 
            website: data.website,
            logo: properLogo,
            // we could also update descriptions if needed, but let's just fix website and logo
          } 
        }
      );

      if (result.modifiedCount > 0) {
        console.log(`✅ Fixed URL & Logo for: ${data.name}`);
        updated++;
      }
    }
    
    console.log(`🎉 Finished! Updated ${updated} tools to fix their website and logo.`);
  } catch (error) {
    console.error('Error updating tools:', error);
  } finally {
    await client.close();
  }
}

updateTools();
