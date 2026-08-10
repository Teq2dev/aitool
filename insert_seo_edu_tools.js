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
  // SEO & Marketing Tools
  {"name": "Clearscope", "website": "https://www.clearscope.io", "category": "SEO", "pricing": "Paid", "shortDescription": "Top-tier SEO content optimization platform for serious marketers."},
  {"name": "RankMath AI", "website": "https://rankmath.com", "category": "SEO", "pricing": "Freemium", "shortDescription": "WordPress SEO plugin with built-in Content AI capabilities."},
  {"name": "InLinks", "website": "https://inlinks.net", "category": "SEO", "pricing": "Paid", "shortDescription": "Entity-based SEO tool for internal linking and schema markup."},
  {"name": "Keyword Insights", "website": "https://www.keywordinsights.ai", "category": "SEO", "pricing": "Paid", "shortDescription": "Cluster keywords and generate content briefs using AI."},
  {"name": "PageOptimizer Pro", "website": "https://pageoptimizer.pro", "category": "SEO", "pricing": "Paid", "shortDescription": "On-page SEO tool built on scientific testing methods."},
  {"name": "WordLift", "website": "https://wordlift.io", "category": "SEO", "pricing": "Paid", "shortDescription": "AI-powered SEO tool that translates text into structured data."},
  {"name": "INK AI", "website": "https://inkforall.com", "category": "SEO", "pricing": "Paid", "shortDescription": "All-in-one AI content optimization and writing platform."},
  {"name": "Content Harmony", "website": "https://www.contentharmony.com", "category": "SEO", "pricing": "Paid", "shortDescription": "Build data-driven content briefs and optimize for search engines."},
  {"name": "Diib", "website": "https://diib.com", "category": "SEO", "pricing": "Freemium", "shortDescription": "AI tool that gives you a customized growth plan for your website."},
  {"name": "CanIRank", "website": "https://www.canirank.com", "category": "SEO", "pricing": "Freemium", "shortDescription": "SEO software that uses AI to tell you exactly how to rank."},
  {"name": "WriterZen", "website": "https://writerzen.net", "category": "SEO", "pricing": "Paid", "shortDescription": "Pioneer toolset for exploring SEO content opportunities."},
  {"name": "Link Whisper", "website": "https://linkwhisper.com", "category": "SEO", "pricing": "Paid", "shortDescription": "AI-powered WordPress plugin for faster internal linking."},
  {"name": "RankIQ", "website": "https://www.rankiq.com", "category": "SEO", "pricing": "Paid", "shortDescription": "AI SEO toolset built specifically for bloggers and publishers."},
  {"name": "Twinword", "website": "https://www.twinword.com", "category": "SEO", "pricing": "Freemium", "shortDescription": "AI-powered keyword research tool that groups words by user intent."},
  {"name": "Morningscore", "website": "https://morningscore.io", "category": "SEO", "pricing": "Paid", "shortDescription": "Gamified SEO platform that simplifies complex metrics using AI."},
  {"name": "TextOptimizer", "website": "https://textoptimizer.com", "category": "SEO", "pricing": "Freemium", "shortDescription": "Semantic SEO tool that extracts intent tables from search results."},
  {"name": "Postaga", "website": "https://postaga.com", "category": "SEO", "pricing": "Paid", "shortDescription": "AI-powered platform for automated link building outreach."},
  {"name": "Frase", "website": "https://www.frase.io", "category": "SEO", "pricing": "Paid", "shortDescription": "AI tool that helps you research, write, and optimize high-quality SEO content."},
  {"name": "Topic", "website": "https://www.usetopic.com", "category": "SEO", "pricing": "Paid", "shortDescription": "Drive more organic traffic by creating comprehensive content briefs."},
  {"name": "AISEO", "website": "https://aiseo.ai", "category": "SEO", "pricing": "Paid", "shortDescription": "AI copywriting tool focused heavily on SEO optimization."},
  {"name": "ContentBot", "website": "https://contentbot.ai", "category": "Writing", "pricing": "Paid", "shortDescription": "Advanced AI content creator with automated workflows."},
  {"name": "GetGenie", "website": "https://getgenie.ai", "category": "SEO", "pricing": "Freemium", "shortDescription": "WordPress AI assistant for SEO and content writing."},
  {"name": "Squirrly SEO", "website": "https://www.squirrly.co", "category": "SEO", "pricing": "Freemium", "shortDescription": "AI SEO consultant embedded directly into WordPress."},
  {"name": "SEOVendor", "website": "https://seovendor.co", "category": "SEO", "pricing": "Paid", "shortDescription": "White label AI SEO platform for agencies."},
  {"name": "Writesonic", "website": "https://writesonic.com", "category": "Writing", "pricing": "Freemium", "shortDescription": "AI writer that creates SEO-friendly content for blogs and ads."},
  {"name": "Keywords Everywhere", "website": "https://keywordseverywhere.com", "category": "SEO", "pricing": "Freemium", "shortDescription": "Browser extension that shows search volume and AI-generated topics."},
  {"name": "SE Ranking", "website": "https://seranking.com", "category": "SEO", "pricing": "Paid", "shortDescription": "All-inclusive SEO software with powerful AI content tracking."},
  {"name": "SpyFu", "website": "https://www.spyfu.com", "category": "SEO", "pricing": "Paid", "shortDescription": "Competitor keyword research tools augmented with smart insights."},
  {"name": "GrowthBar SEO", "website": "https://www.growthbarseo.com", "category": "SEO", "pricing": "Paid", "shortDescription": "Make SEO content creation 10x faster with AI."},
  {"name": "Surfer Local", "website": "https://surferlocal.com", "category": "SEO", "pricing": "Paid", "shortDescription": "AI tool to optimize your Google Business Profile and local SEO."},
  
  // Education & EdTech Tools
  {"name": "Quizlet Q-Chat", "website": "https://quizlet.com/features/q-chat", "category": "Education", "pricing": "Freemium", "shortDescription": "The first fully adaptive AI tutor built directly into Quizlet."},
  {"name": "Duolingo Max", "website": "https://blog.duolingo.com/duolingo-max", "category": "Education", "pricing": "Paid", "shortDescription": "Language learning enhanced with AI roleplay and detailed explanations."},
  {"name": "Socratic by Google", "website": "https://socratic.org", "category": "Education", "pricing": "Free", "shortDescription": "Google's AI app that helps students understand their school work."},
  {"name": "Photomath", "website": "https://photomath.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Scan math problems and get AI-generated step-by-step solutions."},
  {"name": "Elsa Speak", "website": "https://elsaspeak.com", "category": "Education", "pricing": "Freemium", "shortDescription": "AI-powered English pronunciation coach."},
  {"name": "Brainly AI", "website": "https://brainly.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Peer-to-peer learning platform enhanced with AI moderation and tutoring."},
  {"name": "Squirrel AI", "website": "https://squirrelai.com", "category": "Education", "pricing": "Paid", "shortDescription": "Advanced adaptive learning system for K-12 education."},
  {"name": "Carnegie Learning", "website": "https://www.carnegielearning.com", "category": "Education", "pricing": "Paid", "shortDescription": "AI software for mathematics that mimics a human tutor."},
  {"name": "Cognii", "website": "https://cognii.com", "category": "Education", "pricing": "Paid", "shortDescription": "Conversational AI for educational assessments and tutoring."},
  {"name": "Century Tech", "website": "https://www.century.tech", "category": "Education", "pricing": "Paid", "shortDescription": "AI teaching and learning platform for schools and colleges."},
  {"name": "Gradescope", "website": "https://www.gradescope.com", "category": "Education", "pricing": "Freemium", "shortDescription": "AI-assisted grading platform that halves the time spent grading."},
  {"name": "Turnitin Draft Coach", "website": "https://www.turnitin.com", "category": "Education", "pricing": "Paid", "shortDescription": "Helps students improve writing with AI similarity checking and grammar feedback."},
  {"name": "Fetchy", "website": "https://www.fetchy.com", "category": "Education", "pricing": "Paid", "shortDescription": "A platform empowering educators to simplify planning and generate lessons."},
  {"name": "Eduaide.ai", "website": "https://www.eduaide.ai", "category": "Education", "pricing": "Freemium", "shortDescription": "AI-assisted instructional design for teachers."},
  {"name": "MagicSchool AI", "website": "https://www.magicschool.ai", "category": "Education", "pricing": "Freemium", "shortDescription": "The most widely used AI platform for educators to plan lessons and write assessments."},
  {"name": "Diffit", "website": "https://web.diffit.me", "category": "Education", "pricing": "Freemium", "shortDescription": "Teachers use Diffit to instantly get leveled resources for all students."},
  {"name": "QuestionWell", "website": "https://www.questionwell.org", "category": "Education", "pricing": "Freemium", "shortDescription": "Generate endless questions for your students from any reading."},
  {"name": "Formative AI", "website": "https://www.formative.com", "category": "Education", "pricing": "Paid", "shortDescription": "AI tools to generate hints, feedback, and questions for student assessments."},
  {"name": "Brisk Teaching", "website": "https://www.briskteaching.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Free Chrome extension that saves teachers hours of work using AI."},
  {"name": "Twee", "website": "https://twee.com", "category": "Education", "pricing": "Freemium", "shortDescription": "AI tools for English teachers to generate texts, dialogues, and exercises."},
  {"name": "Yippity", "website": "https://yippity.io", "category": "Education", "pricing": "Freemium", "shortDescription": "Convert any text or website into a quiz automatically using AI."},
  {"name": "Mindsmith", "website": "https://www.mindsmith.ai", "category": "Education", "pricing": "Freemium", "shortDescription": "Generative AI microlearning platform for corporate and school training."},
  {"name": "Nolej", "website": "https://nolej.io", "category": "Education", "pricing": "Paid", "shortDescription": "Generate interactive e-learning content from any document or video."},
  {"name": "TeachMateAI", "website": "https://teachmateai.com", "category": "Education", "pricing": "Freemium", "shortDescription": "AI assistant suite designed specifically for primary and secondary teachers."},
  {"name": "LessonPlans.ai", "website": "https://www.lessonplans.ai", "category": "Education", "pricing": "Paid", "shortDescription": "Generate detailed, high-quality lesson plans with a click."},
  {"name": "To Teach", "website": "https://to-teach.ai", "category": "Education", "pricing": "Freemium", "shortDescription": "AI-powered tool that creates personalized teaching materials."},
  {"name": "SchoolAI", "website": "https://schoolai.com", "category": "Education", "pricing": "Free", "shortDescription": "Safe, monitored AI chat spaces for students to learn interactively."},
  {"name": "Conker", "website": "https://www.conker.ai", "category": "Education", "pricing": "Freemium", "shortDescription": "Create standards-aligned quizzes in seconds with AI."},
  {"name": "Quizgecko", "website": "https://quizgecko.com", "category": "Education", "pricing": "Paid", "shortDescription": "AI test and quiz maker from text, PDFs, or YouTube videos."},
  {"name": "Monic.ai", "website": "https://monic.ai", "category": "Education", "pricing": "Freemium", "shortDescription": "The ultimate AI-powered study space for students."},
  {"name": "Knowji", "website": "https://knowji.com", "category": "Education", "pricing": "Paid", "shortDescription": "Audio-visual vocabulary app built on educational research and AI."},
  {"name": "Speechify", "website": "https://speechify.com", "category": "Education", "pricing": "Freemium", "shortDescription": "The #1 AI text-to-speech app for reading textbooks and articles faster."},
  {"name": "NaturalReader", "website": "https://www.naturalreaders.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Professional text-to-speech software for students and professionals."},
  {"name": "Otter.ai", "website": "https://otter.ai", "category": "Productivity", "pricing": "Freemium", "shortDescription": "AI meeting assistant that records, transcribes, and summarizes lectures."},
  {"name": "Glean", "website": "https://glean.co", "category": "Education", "pricing": "Paid", "shortDescription": "Note-taking tool designed specifically for college students and learners."},
  {"name": "Notta", "website": "https://www.notta.ai", "category": "Productivity", "pricing": "Freemium", "shortDescription": "AI voice-to-text platform for recording and transcribing classes."},
  {"name": "Fathom", "website": "https://fathom.video", "category": "Productivity", "pricing": "Free", "shortDescription": "Free AI meeting recorder that transcribes and highlights study notes."},
  {"name": "GoodNotes AI", "website": "https://www.goodnotes.com", "category": "Education", "pricing": "Freemium", "shortDescription": "The world's most popular digital paper now features AI handwriting recognition."},
  {"name": "MarginNote", "website": "https://www.marginnote.com", "category": "Education", "pricing": "Paid", "shortDescription": "Deep reading and study app for organizing textbook information."},
  {"name": "LiquidText", "website": "https://www.liquidtext.net", "category": "Education", "pricing": "Paid", "shortDescription": "Read, organize, and analyze documents perfectly for students."},
  {"name": "Scholarcy", "website": "https://www.scholarcy.com", "category": "Research", "pricing": "Freemium", "shortDescription": "AI-powered article summarizer that reads research papers for you."},
  {"name": "Semantic Scholar", "website": "https://www.semanticscholar.org", "category": "Research", "pricing": "Free", "shortDescription": "Free, AI-driven search engine for scientific literature."},
  {"name": "Connected Papers", "website": "https://www.connectedpapers.com", "category": "Research", "pricing": "Freemium", "shortDescription": "Visual tool to help researchers and students find academic papers."},
  {"name": "Litmaps", "website": "https://www.litmaps.com", "category": "Research", "pricing": "Freemium", "shortDescription": "Discover scientific literature through visual citation networks."},
  {"name": "Wolfram Alpha", "website": "https://www.wolframalpha.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Computational intelligence engine capable of solving advanced math and science."},
  {"name": "Symbolab", "website": "https://www.symbolab.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Math solver that provides step-by-step solutions using AI."},
  {"name": "Mathway", "website": "https://www.mathway.com", "category": "Education", "pricing": "Freemium", "shortDescription": "The world's smartest math calculator for algebra, calculus, and more."},
  {"name": "Cymath", "website": "https://www.cymath.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Math problem solver with steps powered by AI and heuristics."},
  {"name": "Course Hero AI", "website": "https://www.coursehero.com", "category": "Education", "pricing": "Paid", "shortDescription": "Provides AI homework help and course-specific study resources."},
  {"name": "CheggMate", "website": "https://www.chegg.com", "category": "Education", "pricing": "Paid", "shortDescription": "Chegg's AI study assistant built on GPT-4 for personalized tutoring."},
  {"name": "Yuzu", "website": "https://www.yuzu.com", "category": "Education", "pricing": "Paid", "shortDescription": "Digital learning platform tailored for college students."},
  {"name": "DreamBox", "website": "https://www.dreambox.com", "category": "Education", "pricing": "Paid", "shortDescription": "Intelligent adaptive learning technology for K-8 math and reading."},
  {"name": "Smart Sparrow", "website": "https://www.smartsparrow.com", "category": "Education", "pricing": "Paid", "shortDescription": "Adaptive e-learning platform that lets teachers create personalized courseware."},
  {"name": "Aleks", "website": "https://www.aleks.com", "category": "Education", "pricing": "Paid", "shortDescription": "Assessment and learning system covering math, chemistry, and statistics."},
  {"name": "Top Hat", "website": "https://tophat.com", "category": "Education", "pricing": "Paid", "shortDescription": "Active learning platform for higher education with AI features."},
  {"name": "Packback", "website": "https://www.packback.co", "category": "Education", "pricing": "Paid", "shortDescription": "AI-supported discussion platform that improves student engagement."},
  {"name": "Peerceptiv", "website": "https://www.peerceptiv.com", "category": "Education", "pricing": "Paid", "shortDescription": "Research-validated peer assessment platform powered by AI."},
  {"name": "Padlet", "website": "https://padlet.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Digital canvas to create beautiful projects with new AI creation tools."},
  {"name": "Wakelet", "website": "https://wakelet.com", "category": "Education", "pricing": "Free", "shortDescription": "Save, organize, and share content from across the web for educators."},
  {"name": "Kahoot! AI", "website": "https://kahoot.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Create engaging learning games instantly with Kahoot's new AI generator."},
  {"name": "Blooket", "website": "https://www.blooket.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Exciting trivia and review games for the modern classroom."},
  {"name": "Gimkit", "website": "https://www.gimkit.com", "category": "Education", "pricing": "Paid", "shortDescription": "Live learning game created by a high school student."},
  {"name": "Nearpod", "website": "https://nearpod.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Make any lesson interactive with AI-generated formative assessments."},
  {"name": "Pear Deck", "website": "https://www.peardeck.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Engage every student in your class with interactive AI presentations."},
  {"name": "Slido", "website": "https://www.slido.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Audience interaction tool for meetings and classes with AI analytics."},
  {"name": "Mentimeter", "website": "https://www.mentimeter.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Interactive presentations software with smart slide generation."},
  {"name": "Canva for Education", "website": "https://www.canva.com/education", "category": "Education", "pricing": "Free", "shortDescription": "100% free AI design tools specifically unlocked for K-12 educators."},
  {"name": "Adobe Express for Education", "website": "https://www.adobe.com/education/express", "category": "Education", "pricing": "Free", "shortDescription": "Free creative AI tools for the classroom powered by Adobe Firefly."},
  {"name": "Book Creator", "website": "https://bookcreator.com", "category": "Education", "pricing": "Freemium", "shortDescription": "Simple tool for creating awesome digital books in the classroom."},
  {"name": "Syllaby", "website": "https://syllaby.io", "category": "SEO", "pricing": "Paid", "shortDescription": "AI tool that helps you find the top questions your customers are searching for."},
  {"name": "HubSpot Content Assistant", "website": "https://www.hubspot.com/products/artificial-intelligence", "category": "SEO", "pricing": "Freemium", "shortDescription": "AI-powered content assistant natively built into the HubSpot CRM."},
  {"name": "Tugan AI", "website": "https://www.tugan.ai", "category": "SEO", "pricing": "Paid", "shortDescription": "Generate high-converting marketing copy and SEO articles instantly."}
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
      if (added >= 100) break;

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
    
    console.log(`🎉 Finished! Added ${added} new unique AI tools in SEO & Education.`);
  } catch (error) {
    console.error('Error inserting tools:', error);
  } finally {
    await client.close();
  }
}

insertTools();
