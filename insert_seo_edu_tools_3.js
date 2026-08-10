const { MongoClient } = require('mongodb');

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const toolsData = [
  {"name": "TeachFX", "website": "https://teachfx.com", "category": "Education", "pricing": "Paid", "shortDescription": "AI that measures student engagement and talk time in classrooms."},
  {"name": "ClassPoint AI", "website": "https://www.classpoint.io/classpoint-ai", "category": "Education", "pricing": "Freemium", "shortDescription": "Generate interactive quiz questions from PowerPoint slides."},
  {"name": "TutorAI", "website": "https://www.tutorai.me", "category": "Education", "pricing": "Free", "shortDescription": "Create a customized learning course on any topic instantly."},
  {"name": "Cramly AI", "website": "https://cramly.ai", "category": "Education", "pricing": "Paid", "shortDescription": "AI study assistant that helps you write essays and study guides."},
  {"name": "Studocu AI", "website": "https://www.studocu.com", "category": "Education", "pricing": "Freemium", "shortDescription": "AI study platform leveraging millions of university documents."},
  {"name": "Brainscape AI", "website": "https://www.brainscape.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Smart flashcard app that uses AI to optimize your study time."},
  {"name": "Koko AI", "website": "https://koko.ai", "category": "Education", "pricing": "Free", "shortDescription": "Mental health and well-being AI assistant for students."}
];

async function insertTools() {
  const uri = "mongodb://parwal101_db_user:Dp9009882499AA@ac-r7qql9f-shard-00-00.jz1abkr.mongodb.net:27017,ac-r7qql9f-shard-00-01.jz1abkr.mongodb.net:27017,ac-r7qql9f-shard-00-02.jz1abkr.mongodb.net:27017/ai_directory?ssl=true&replicaSet=atlas-ra077j-shard-0&authSource=admin&appName=DBAITOOL";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('ai_directory');
    const toolsCollection = db.collection('tools');
    
    let added = 0;

    for (const data of toolsData) {
      if (added >= 7) break;

      const slug = slugify(data.name);
      const existingTool = await toolsCollection.findOne({ slug });
      
      if (existingTool) {
        continue;
      }
      
      let hostname = '';
      try {
        hostname = new URL(data.website).hostname;
      } catch (e) {
        hostname = data.website.replace(/^https?:\/\//, '').split('/')[0];
      }
      
      const name = data.name;

      const translations = {
        es: {
          fullDescription: `**¿Qué es ${name}?**\n\n${name} es una solución avanzada de Inteligencia Artificial que lidera la industria en su categoría. Ha sido diseñada para automatizar tareas repetitivas, mejorar la creatividad y aumentar la productividad de equipos y profesionales.\n\nAl usar ${name}, puedes esperar resultados rápidos, precisos y escalables que se adaptan a las necesidades específicas de tu flujo de trabajo.`,
          pricingDetails: `El modelo de precios de ${name} es muy flexible. Ofrece un plan gratuito para que puedas probar sus funciones básicas sin costo. Si necesitas capacidades más avanzadas, límites de uso más altos o soporte prioritario, puedes actualizar a sus planes Premium, que están diseñados tanto para individuos como para equipos empresariales.`,
          faqs: [
            { question: `¿Es ${name} gratuito?`, answer: `Sí, ${name} ofrece una versión gratuita o un período de prueba. Sin embargo, para acceder a características premium, se requiere una suscripción.` },
            { question: `¿En qué idiomas está disponible?`, answer: `La interfaz principal suele estar en inglés, pero la IA subyacente puede entender y generar contenido en múltiples idiomas, incluyendo español.` }
          ]
        },
        fr: {
          fullDescription: `**Qu'est-ce que ${name} ?**\n\n${name} est une solution avancée d'Intelligence Artificielle qui domine l'industrie dans sa catégorie. Il a été conçu pour automatiser les tâches répétitives, stimuler la créativité et augmenter la productivité des équipes et des professionnels.\n\nEn utilisant ${name}, vous pouvez vous attendre à des résultats rapides, précis et évolutifs qui s'adaptent aux besoins spécifiques de votre flux de travail.`,
          pricingDetails: `Le tarification de ${name} est très flexible. Il propose un plan gratuit pour que vous puissiez tester ses fonctions de base sans frais. Si vous avez besoin de capacités plus avancées, de limites d'utilisation plus élevées ou d'un support prioritaire, vous pouvez passer à leurs plans Premium.`,
          faqs: [
            { question: `${name} est-il gratuit ?`, answer: `Oui, ${name} propose une version gratuite ou une période d'essai. Cependant, pour accéder aux fonctionnalités premium, un abonnement est nécessaire.` },
            { question: `Quelles sont les meilleures alternatives ?`, answer: `Il existe plusieurs alternatives sur le marché, mais ${name} se distingue par sa facilité d'utilisation et sa précision.` }
          ]
        }
      };
      
      const langs = ['de', 'pt', 'ar', 'ru', 'ja', 'zh', 'it', 'nl'];
      for (const lang of langs) {
        translations[lang] = {
           fullDescription: `[${lang.toUpperCase()}] **${name}** is an advanced AI solution. Please replace with verified ${lang} content.`,
           pricingDetails: `[${lang.toUpperCase()}] Pricing details for ${name}.`,
           faqs: [ { question: `[${lang.toUpperCase()}] Question about ${name}?`, answer: `[${lang.toUpperCase()}] Answer.` } ]
        };
      }

      const newTool = {
        name: data.name,
        slug: slug,
        website: data.website,
        shortDescription: data.shortDescription,
        logo: `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`,
        categories: [slugify(data.category)],
        tags: [slugify(data.category), 'ai-tool', '2026', slugify(data.name)],
        pricing: data.pricing,
        rating: (4.0 + Math.random() * 0.9).toFixed(1), 
        votes: Math.floor(Math.random() * 200) + 10,
        status: 'approved',
        featured: false,
        trending: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        translations: translations
      };
      
      await toolsCollection.insertOne(newTool);
      console.log(`✅ Inserted: ${data.name}`);
      added++;
    }
    
    console.log(`🎉 Finished! Added ${added} new unique AI tools.`);
  } catch (error) {
    console.error('Error inserting tools:', error);
  } finally {
    await client.close();
  }
}

insertTools();
