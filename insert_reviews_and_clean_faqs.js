const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const mongoUriLine = envContent.split('\n').find(line => line.startsWith('MONGO_URL='));
const uri = mongoUriLine ? mongoUriLine.replace('MONGO_URL=', '').trim() : '';

const firstNames = ['James', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'Lucas', 'Isabella', 'Michael', 'Mia', 'Alexander', 'Charlotte', 'Ethan', 'Amelia', 'Daniel', 'Harper', 'Matthew', 'Evelyn', 'Aiden', 'Abigail', 'Henry', 'Emily', 'Joseph', 'Elizabeth', 'Jackson', 'Sofia', 'Samuel', 'Avery', 'David', 'Ella', 'Carter', 'Scarlett', 'Wyatt', 'Grace', 'Jayden', 'Chloe', 'Gabriel', 'Victoria', 'Isaac', 'Riley', 'Lincoln', 'Aria', 'Anthony', 'Lily', 'Hudson', 'Aubrey', 'Dylan', 'Zoey'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];

const reviewsPool = [
  "I've been using this for a few weeks now and it has completely changed my workflow. Highly recommend!",
  "Solid tool, does exactly what it says on the tin. The interface is clean and straightforward.",
  "Really impressed by the speed and accuracy. It saves me so much time on daily tasks.",
  "Good overall, though it took me a little while to figure out some of the advanced features.",
  "Absolutely essential for my work now. The recent updates made it even better.",
  "Decent platform. A bit pricey if you need all the pro features, but the free version is still very useful.",
  "One of the best AI tools I've tried in this category. Very intuitive.",
  "Game changer for my team! We managed to cut down our processing time by half.",
  "It's good, but customer support could be a bit faster. The tool itself works great though.",
  "I love how easy it is to set up and get started. Very beginner-friendly.",
  "Incredible capabilities! The accuracy of the AI is mind-blowing.",
  "A must-have if you're serious about your work. Worth every penny.",
  "Works perfectly for my use case. Haven't encountered any bugs yet.",
  "Pretty good experience so far. The UI could use a little polish, but functionality is solid.",
  "Exceeded my expectations. I didn't think an AI could handle these complex tasks this well.",
  "Great integration options! It fits perfectly into my existing tech stack.",
  "Reliable and fast. I use it every single day.",
  "Fantastic tool. It genuinely feels like having an extra team member."
];

function getRandomName() {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
}

function getRandomReview() {
  return reviewsPool[Math.floor(Math.random() * reviewsPool.length)];
}

function getRandomPhoto(gender) {
  // Return null 30% of the time so some don't have photos
  if (Math.random() < 0.3) return null;
  const num = Math.floor(Math.random() * 99) + 1;
  return `https://randomuser.me/api/portraits/${gender}/${num}.jpg`;
}

function getRandomRating() {
  // Generate mostly 4s and 5s
  const rand = Math.random();
  if (rand < 0.6) return 5;
  if (rand < 0.9) return 4;
  return 3;
}

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('ai_directory');
    const tools = db.collection('tools');
    const reviews = db.collection('reviews');

    // 1. Clean [EN], [FR], etc. from all properties in translations
    console.log('Cleaning language prefixes from translations...');
    const allTools = await tools.find({}).toArray();
    let cleanedCount = 0;

    const regex = /^\[[A-Z]{2}\]\s*/i;

    for (const tool of allTools) {
      if (!tool.translations) continue;
      
      let changed = false;
      const updatedTranslations = { ...tool.translations };
      
      for (const lang of Object.keys(updatedTranslations)) {
        const trans = updatedTranslations[lang];
        if (!trans) continue;

        // Clean pricingDetails
        if (trans.pricingDetails && regex.test(trans.pricingDetails)) {
          trans.pricingDetails = trans.pricingDetails.replace(regex, '');
          changed = true;
        }

        // Clean FAQs
        if (trans.faqs && Array.isArray(trans.faqs)) {
          trans.faqs.forEach(faq => {
            if (faq.question && regex.test(faq.question)) {
              faq.question = faq.question.replace(regex, '');
              changed = true;
            }
            if (faq.answer && regex.test(faq.answer)) {
              faq.answer = faq.answer.replace(regex, '');
              changed = true;
            }
          });
        }
      }
      
      if (changed) {
        await tools.updateOne({ _id: tool._id }, { $set: { translations: updatedTranslations } });
        cleanedCount++;
      }
    }
    
    console.log(`Cleaned language prefixes from ${cleanedCount} tools.`);

    // 2. Add realistic reviews to the 100 newest tools
    console.log('Adding realistic reviews to newest tools...');
    
    // Get newest 100 tools (the ones added recently)
    const newestTools = await tools.find({}).sort({ createdAt: -1 }).limit(105).toArray();
    
    let totalReviewsAdded = 0;
    
    for (const tool of newestTools) {
      // Check if tool already has reviews to avoid duplicating if we run this twice
      const existingReviewsCount = await reviews.countDocuments({ toolId: tool._id.toString() });
      if (existingReviewsCount > 0) continue; // Skip if it already has reviews

      // Generate 1 to 3 reviews for each tool
      const numReviews = Math.floor(Math.random() * 3) + 1;
      
      const newReviews = [];
      let totalRating = 0;
      
      for (let i = 0; i < numReviews; i++) {
        const gender = Math.random() > 0.5 ? 'men' : 'women';
        const rating = getRandomRating();
        totalRating += rating;
        
        newReviews.push({
          toolId: tool._id.toString(),
          userName: getRandomName(),
          userPhoto: getRandomPhoto(gender),
          rating: rating,
          comment: getRandomReview(),
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)), // Random time within last 7 days
          updatedAt: new Date()
        });
      }
      
      if (newReviews.length > 0) {
        await reviews.insertMany(newReviews);
        totalReviewsAdded += newReviews.length;
        
        // Update tool's aggregate rating and votes
        const avgRating = (totalRating / numReviews).toFixed(1);
        await tools.updateOne(
          { _id: tool._id },
          { $set: { rating: parseFloat(avgRating), votes: numReviews } }
        );
      }
    }
    
    console.log(`Added ${totalReviewsAdded} realistic reviews to the new tools.`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
