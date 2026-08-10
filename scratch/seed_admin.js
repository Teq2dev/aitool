import { getCollection } from '../lib/db.js';

async function seedAdmin() {
  try {
    const usersCollection = await getCollection('users');
    const email = 'parwal111@gmail.com';

    const result = await usersCollection.updateOne(
      { email: email.toLowerCase() },
      {
        $set: {
          email: email.toLowerCase(),
          role: 'admin',
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        }
      },
      { upsert: true }
    );

    console.log(`✅ Successfully set ${email} as admin:`, result);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting admin:', error);
    process.exit(1);
  }
}

seedAdmin();
