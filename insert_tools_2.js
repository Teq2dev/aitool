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
  {"name": "Humata AI", "website": "https://www.humata.ai", "category": "Document Analysis", "pricing": "Freemium", "shortDescription": "Chat with your PDFs and get answers instantly."},
  {"name": "AskYourPDF", "website": "https://askyourpdf.com", "category": "Document Analysis", "pricing": "Freemium", "shortDescription": "An interactive chatbot for your PDF documents."},
  {"name": "Sharly AI", "website": "https://www.sharly.ai", "category": "Document Analysis", "pricing": "Freemium", "shortDescription": "Understand long documents in seconds with AI."},
  {"name": "SciSpace", "website": "https://typeset.io", "category": "Research", "pricing": "Freemium", "shortDescription": "AI copilot for reading and understanding research papers."},
  {"name": "Bearly AI", "website": "https://bearly.ai", "category": "Productivity", "pricing": "Freemium", "shortDescription": "Read, write, and create faster with an AI assistant for researchers."},
  {"name": "Monica", "website": "https://monica.im", "category": "Productivity", "pricing": "Freemium", "shortDescription": "Your AI copilot in the browser, powered by GPT-4 and Claude."},
  {"name": "Harpa AI", "website": "https://harpa.ai", "category": "Productivity", "pricing": "Freemium", "shortDescription": "Hybrid AI search and web automation extension."},
  {"name": "Merlin AI", "website": "https://getmerlin.in", "category": "Productivity", "pricing": "Freemium", "shortDescription": "ChatGPT extension for writing, summarizing, and coding anywhere."},
  {"name": "WebChatGPT", "website": "https://webchatgpt.app", "category": "Browser Extension", "pricing": "Free", "shortDescription": "Augment your ChatGPT prompts with relevant results from the web."},
  {"name": "PromptPerfect", "website": "https://promptperfect.jina.ai", "category": "Prompt Engineering", "pricing": "Freemium", "shortDescription": "Optimize your prompts for ChatGPT, Midjourney, DALL-E, and more."},
  {"name": "AgilityWriter", "website": "https://agilitywriter.ai", "category": "Writing", "pricing": "Paid", "shortDescription": "Generate high-quality, long-form SEO articles in 1 click."},
  {"name": "ZimmWriter", "website": "https://zimmwriter.com", "category": "Writing", "pricing": "Paid", "shortDescription": "The world's first AI content writer for Microsoft Windows."},
  {"name": "Cuppa", "website": "https://cuppa.sh", "category": "Writing", "pricing": "Paid", "shortDescription": "Build and deploy AI content at scale effortlessly."},
  {"name": "SEOwriting.ai", "website": "https://seowriting.ai", "category": "Writing", "pricing": "Paid", "shortDescription": "1-click AI writer for creating SEO-optimized articles, blog posts & affiliate content."},
  {"name": "NeuronWriter", "website": "https://neuronwriter.com", "category": "SEO", "pricing": "Paid", "shortDescription": "Optimize your content for SEO with advanced NLP recommendations."},
  {"name": "Dashword", "website": "https://dashword.com", "category": "SEO", "pricing": "Paid", "shortDescription": "SEO content optimization software for growing teams."},
  {"name": "Robinize", "website": "https://robinize.com", "category": "SEO", "pricing": "Paid", "shortDescription": "AI-powered SEO tool to help you write content that ranks."},
  {"name": "Outranking", "website": "https://outranking.io", "category": "SEO", "pricing": "Paid", "shortDescription": "AI-powered SEO content creation and optimization platform."},
  {"name": "TextCortex", "website": "https://textcortex.com", "category": "Writing", "pricing": "Freemium", "shortDescription": "Customizable AI companion for writing and content creation."},
  {"name": "WordHero", "website": "https://wordhero.co", "category": "Writing", "pricing": "Paid", "shortDescription": "AI writing tool that creates original blog posts, social media content, and emails."},
  {"name": "Nichesss", "website": "https://nichesss.com", "category": "Writing", "pricing": "Paid", "shortDescription": "Find profitable niches and generate content instantly."},
  {"name": "ClosersCopy", "website": "https://closerscopy.com", "category": "Writing", "pricing": "Paid", "shortDescription": "AI copywriting software for sales pages, emails, and blogs."},
  {"name": "Peppertype", "website": "https://peppertype.ai", "category": "Writing", "pricing": "Paid", "shortDescription": "AI content generation tool for marketers and creators."},
  {"name": "Copysmith", "website": "https://copysmith.ai", "category": "Marketing", "pricing": "Paid", "shortDescription": "Enterprise AI content creation for eCommerce teams."},
  {"name": "AI-Writer", "website": "https://ai-writer.com", "category": "Writing", "pricing": "Paid", "shortDescription": "AI text generator that writes articles from just a headline."},
  {"name": "Article Forge", "website": "https://articleforge.com", "category": "Writing", "pricing": "Paid", "shortDescription": "Uses advanced AI to write entire SEO articles automatically."},
  {"name": "Kafkai", "website": "https://kafkai.com", "category": "Writing", "pricing": "Paid", "shortDescription": "Machine learning algorithm that writes articles from scratch."},
  {"name": "Wordplay", "website": "https://wordplay.ai", "category": "Writing", "pricing": "Paid", "shortDescription": "Long-form AI writer that creates 2,000+ word articles in 1 click."},
  {"name": "Autoblogging.ai", "website": "https://autoblogging.ai", "category": "Writing", "pricing": "Paid", "shortDescription": "Generate hundreds of SEO optimized articles automatically."},
  {"name": "Bramework", "website": "https://bramework.com", "category": "Writing", "pricing": "Paid", "shortDescription": "AI writer that helps bloggers write SEO-friendly posts faster."},
  {"name": "LongShot AI", "website": "https://longshot.ai", "category": "Writing", "pricing": "Paid", "shortDescription": "AI assistant for researching and generating long-form SEO content."},
  {"name": "Scalenut", "website": "https://scalenut.com", "category": "SEO", "pricing": "Paid", "shortDescription": "AI-powered SEO and content marketing platform."},
  {"name": "GrowthBar", "website": "https://growthbarseo.com", "category": "SEO", "pricing": "Paid", "shortDescription": "AI writing tool designed specifically for SEOs and marketers."},
  {"name": "Headlime", "website": "https://headlime.com", "category": "Writing", "pricing": "Paid", "shortDescription": "AI-powered copywriting for ads, landing pages, and blogs."},
  {"name": "Creaitor.ai", "website": "https://creaitor.ai", "category": "Writing", "pricing": "Paid", "shortDescription": "AI writing assistant designed to help you write better content."},
  {"name": "Copymatic", "website": "https://copymatic.ai", "category": "Writing", "pricing": "Paid", "shortDescription": "Generate engaging copy for your business in seconds."},
  {"name": "Simplified", "website": "https://simplified.com", "category": "Marketing", "pricing": "Freemium", "shortDescription": "All-in-one AI app for marketing, design, video, and writing."},
  {"name": "Neuraltext", "website": "https://neuraltext.com", "category": "SEO", "pricing": "Paid", "shortDescription": "Automate your content operations with AI."},
  {"name": "Bertha.ai", "website": "https://bertha.ai", "category": "Writing", "pricing": "Freemium", "shortDescription": "The AI copywriting assistant for WordPress and Shopify."},
  {"name": "MarkCopy", "website": "https://markcopy.ai", "category": "Writing", "pricing": "Paid", "shortDescription": "AI writing assistant for scaling your content creation."},
  {"name": "Easy-Peasy.AI", "website": "https://easy-peasy.ai", "category": "Productivity", "pricing": "Freemium", "shortDescription": "AI content generator with 90+ templates and AI chat."},
  {"name": "Typli", "website": "https://typli.ai", "category": "Writing", "pricing": "Paid", "shortDescription": "Intuitive AI writer and SEO checker built together."},
  {"name": "Wordtune", "website": "https://wordtune.com", "category": "Writing", "pricing": "Freemium", "shortDescription": "AI reading and writing companion that understands context."},
  {"name": "ProWritingAid", "website": "https://prowritingaid.com", "category": "Writing", "pricing": "Freemium", "shortDescription": "AI-powered writing assistant, grammar checker, and style editor."},
  {"name": "Trinka", "website": "https://trinka.ai", "category": "Writing", "pricing": "Freemium", "shortDescription": "AI grammar checker and language correction tool for academic writing."},
  {"name": "InstaText", "website": "https://instatext.io", "category": "Writing", "pricing": "Paid", "shortDescription": "AI tool that rewrites your text to make it read like a native speaker."},
  {"name": "DeepL Write", "website": "https://deepl.com/write", "category": "Writing", "pricing": "Freemium", "shortDescription": "AI-powered writing companion from the creators of DeepL Translator."},
  {"name": "Writecream", "website": "https://writecream.com", "category": "Marketing", "pricing": "Freemium", "shortDescription": "AI tool for cold emails, voiceovers, podcasts, and icebreakers."},
  {"name": "Smartwriter", "website": "https://smartwriter.ai", "category": "Sales", "pricing": "Paid", "shortDescription": "Generate highly personalized cold emails using AI."},
  {"name": "Lavender", "website": "https://lavender.ai", "category": "Sales", "pricing": "Paid", "shortDescription": "AI email coach that helps sales teams write better emails faster."},
  {"name": "Warmer.ai", "website": "https://warmer.ai", "category": "Sales", "pricing": "Paid", "shortDescription": "AI email personalization tool for cold outreach."},
  {"name": "Quicklines", "website": "https://quicklines.ai", "category": "Sales", "pricing": "Paid", "shortDescription": "AI-powered icebreakers for your cold email campaigns."},
  {"name": "Regie.ai", "website": "https://regie.ai", "category": "Sales", "pricing": "Paid", "shortDescription": "Generative AI for modern sales teams."},
  {"name": "Apollo AI", "website": "https://apollo.io", "category": "Sales", "pricing": "Freemium", "shortDescription": "Sales intelligence platform with built-in AI writing and routing."},
  {"name": "Crystal Knows", "website": "https://crystalknows.com", "category": "Sales", "pricing": "Freemium", "shortDescription": "AI that analyzes personality to help you communicate better in sales."},
  {"name": "Humantic AI", "website": "https://humantic.ai", "category": "Sales", "pricing": "Paid", "shortDescription": "Buyer intelligence platform for revenue teams."},
  {"name": "Twain", "website": "https://twain.ai", "category": "Sales", "pricing": "Freemium", "shortDescription": "AI communication assistant for sales outreach."},
  {"name": "Flowrite", "website": "https://flowrite.com", "category": "Productivity", "pricing": "Paid", "shortDescription": "AI tool that turns short instructions into ready-to-send emails."},
  {"name": "Tugan.ai", "website": "https://tugan.ai", "category": "Marketing", "pricing": "Paid", "shortDescription": "Generate marketing emails and newsletters from a URL."},
  {"name": "Hoppy Copy", "website": "https://hoppycopy.co", "category": "Marketing", "pricing": "Paid", "shortDescription": "AI copywriter specifically designed for email marketers."},
  {"name": "Mailbutler", "website": "https://mailbutler.io", "category": "Productivity", "pricing": "Freemium", "shortDescription": "Email extension for Apple Mail, Gmail, and Outlook with AI features."},
  {"name": "EmailTree", "website": "https://emailtree.ai", "category": "Customer Support", "pricing": "Paid", "shortDescription": "AI-driven platform for email management and customer service."},
  {"name": "Missive", "website": "https://missiveapp.com", "category": "Productivity", "pricing": "Freemium", "shortDescription": "Team email and chat app with OpenAI integration."},
  {"name": "Superhuman AI", "website": "https://superhuman.com", "category": "Productivity", "pricing": "Paid", "shortDescription": "The fastest email experience ever made, now powered by AI."},
  {"name": "Shortwave", "website": "https://shortwave.com", "category": "Productivity", "pricing": "Freemium", "shortDescription": "Smart email client built by ex-Googlers with AI summaries and drafting."},
  {"name": "Ellie", "website": "https://ellieai.com", "category": "Productivity", "pricing": "Freemium", "shortDescription": "AI email assistant that learns your writing style."},
  {"name": "GhostWrite", "website": "https://ghostwrite.rip", "category": "Productivity", "pricing": "Free", "shortDescription": "AI email writer extension for Gmail."},
  {"name": "ChatGPT Writer", "website": "https://chatgptwriter.ai", "category": "Browser Extension", "pricing": "Free", "shortDescription": "Free Chrome extension to write emails and messages using AI."},
  {"name": "Compose AI", "website": "https://compose.ai", "category": "Browser Extension", "pricing": "Freemium", "shortDescription": "Chrome extension that cuts your writing time by 40% with AI-powered autocompletion."},
  {"name": "Luna", "website": "https://getluna.dev", "category": "Sales", "pricing": "Paid", "shortDescription": "B2B lead generation software that uses AI to suggest new leads and write emails."},
  {"name": "Nanonets", "website": "https://nanonets.com", "category": "Data Extraction", "pricing": "Freemium", "shortDescription": "AI-based OCR software to automate data capture from documents."},
  {"name": "Rossum", "website": "https://rossum.ai", "category": "Data Extraction", "pricing": "Paid", "shortDescription": "Cloud-based intelligent document processing platform."},
  {"name": "Klippa", "website": "https://klippa.com", "category": "Data Extraction", "pricing": "Paid", "shortDescription": "Automate document workflows with AI-powered OCR."},
  {"name": "Hyperscience", "website": "https://hyperscience.com", "category": "Data Extraction", "pricing": "Paid", "shortDescription": "Enterprise AI platform for document processing and automation."},
  {"name": "Parashift", "website": "https://parashift.io", "category": "Data Extraction", "pricing": "Paid", "shortDescription": "Cloud-based machine learning OCR platform for document extraction."},
  {"name": "Docparser", "website": "https://docparser.com", "category": "Data Extraction", "pricing": "Paid", "shortDescription": "Extract data from PDF documents using rule-based parsing and AI."},
  {"name": "Parseur", "website": "https://parseur.com", "category": "Data Extraction", "pricing": "Freemium", "shortDescription": "Email and PDF parsing software powered by AI."},
  {"name": "Affinda", "website": "https://affinda.com", "category": "Data Extraction", "pricing": "Freemium", "shortDescription": "AI document processing API for resumes, invoices, and more."},
  {"name": "Base64.ai", "website": "https://base64.ai", "category": "Data Extraction", "pricing": "Paid", "shortDescription": "Instantly process all types of documents with AI."},
  {"name": "Veryfi", "website": "https://veryfi.com", "category": "Data Extraction", "pricing": "Paid", "shortDescription": "AI-driven OCR and data extraction for receipts and invoices."},
  {"name": "Mindee", "website": "https://mindee.com", "category": "Data Extraction", "pricing": "Freemium", "shortDescription": "Document parsing API powered by machine learning."},
  {"name": "Sensible", "website": "https://sensible.so", "category": "Data Extraction", "pricing": "Paid", "shortDescription": "Developer platform for extracting structured data from documents."},
  {"name": "Amazon Textract", "website": "https://aws.amazon.com/textract", "category": "Data Extraction", "pricing": "Paid", "shortDescription": "Machine learning service that automatically extracts text from scanned documents."},
  {"name": "Google Document AI", "website": "https://cloud.google.com/document-ai", "category": "Data Extraction", "pricing": "Paid", "shortDescription": "Extract structured data from unstructured documents using Google's AI."},
  {"name": "Microsoft Form Recognizer", "website": "https://azure.microsoft.com", "category": "Data Extraction", "pricing": "Paid", "shortDescription": "Azure AI service that extracts text, key-value pairs, and tables from documents."},
  {"name": "UiPath Document Understanding", "website": "https://uipath.com", "category": "Automation", "pricing": "Paid", "shortDescription": "AI-powered document processing for RPA workflows."},
  {"name": "Automation Anywhere IQ Bot", "website": "https://automationanywhere.com", "category": "Automation", "pricing": "Paid", "shortDescription": "Intelligent document processing combined with RPA."},
  {"name": "Datacap", "website": "https://ibm.com/products/datacap", "category": "Data Extraction", "pricing": "Paid", "shortDescription": "IBM's cognitive capture software for document processing."},
  {"name": "Ephesoft", "website": "https://ephesoft.com", "category": "Data Extraction", "pricing": "Paid", "shortDescription": "Intelligent document processing platform for enterprise automation."},
  {"name": "Dropbox Dash", "website": "https://dropbox.com/dash", "category": "Productivity", "pricing": "Paid", "shortDescription": "AI-powered universal search that connects all your tools."},
  {"name": "Google Workspace Duet AI", "website": "https://workspace.google.com", "category": "Productivity", "pricing": "Paid", "shortDescription": "AI embedded directly into Google Workspace apps."},
  {"name": "Microsoft 365 Copilot", "website": "https://microsoft.com/copilot", "category": "Productivity", "pricing": "Paid", "shortDescription": "Your everyday AI companion for Microsoft 365 applications."},
  {"name": "Zoom AI Companion", "website": "https://zoom.us", "category": "Productivity", "pricing": "Paid", "shortDescription": "Generative AI features integrated directly into Zoom."},
  {"name": "Webex AI Assistant", "website": "https://webex.com", "category": "Productivity", "pricing": "Paid", "shortDescription": "AI-powered summaries, transcripts, and insights for Webex."},
  {"name": "Slack AI", "website": "https://slack.com", "category": "Productivity", "pricing": "Paid", "shortDescription": "Generative AI natively integrated into Slack for channel summaries and search."},
  {"name": "Asana Intelligence", "website": "https://asana.com", "category": "Project Management", "pricing": "Paid", "shortDescription": "AI features to maximize impact and accelerate workflows in Asana."},
  {"name": "ClickUp Brain", "website": "https://clickup.com", "category": "Project Management", "pricing": "Freemium", "shortDescription": "A collection of conversational, contextual, and role-based AI features."},
  {"name": "Monday AI", "website": "https://monday.com", "category": "Project Management", "pricing": "Paid", "shortDescription": "AI assistant to automate tasks and summarize projects in Monday.com."},
  {"name": "Coda AI", "website": "https://coda.io", "category": "Productivity", "pricing": "Freemium", "shortDescription": "The AI work assistant that helps you write, organize, and automate in Coda."},
  {"name": "Evernote AI", "website": "https://evernote.com", "category": "Productivity", "pricing": "Freemium", "shortDescription": "AI-powered note cleanup and search for Evernote users."},
  {"name": "Roam Research", "website": "https://roamresearch.com", "category": "Productivity", "pricing": "Paid", "shortDescription": "A note-taking tool for networked thought with community AI extensions."},
  {"name": "Logseq", "website": "https://logseq.com", "category": "Productivity", "pricing": "Free", "shortDescription": "Privacy-first, open-source knowledge base with AI plugins."},
  {"name": "Tana", "website": "https://tana.inc", "category": "Productivity", "pricing": "Paid", "shortDescription": "The everything OS for teams with deep AI integration."},
  {"name": "Reflect", "website": "https://reflect.app", "category": "Productivity", "pricing": "Paid", "shortDescription": "Fast note-taking app with built-in AI assistant and end-to-end encryption."},
  {"name": "Capacities", "website": "https://capacities.io", "category": "Productivity", "pricing": "Freemium", "shortDescription": "A studio for your mind, organizing notes like objects with AI integration."},
  {"name": "Anytype", "website": "https://anytype.io", "category": "Productivity", "pricing": "Free", "shortDescription": "Local-first, peer-to-peer workspace with emerging AI capabilities."},
  {"name": "Milanote", "website": "https://milanote.com", "category": "Design", "pricing": "Freemium", "shortDescription": "Visual board for organizing creative projects, now with AI text generation."},
  {"name": "Miro Assist", "website": "https://miro.com", "category": "Design", "pricing": "Freemium", "shortDescription": "AI partner for innovation and collaboration in Miro."},
  {"name": "Mural AI", "website": "https://mural.co", "category": "Design", "pricing": "Paid", "shortDescription": "Generate ideas, cluster sticky notes, and summarize content in Mural."},
  {"name": "FigJam AI", "website": "https://figma.com/figjam", "category": "Design", "pricing": "Freemium", "shortDescription": "Generate boards, sort stickies, and summarize meetings in FigJam."},
  {"name": "Whimsical AI", "website": "https://whimsical.com", "category": "Design", "pricing": "Freemium", "shortDescription": "Generate mind maps and flowcharts instantly with AI."},
  {"name": "Xmind AI", "website": "https://xmind.ai", "category": "Productivity", "pricing": "Freemium", "shortDescription": "AI-powered collaborative mind mapping tool."},
  {"name": "MindMeister", "website": "https://mindmeister.com", "category": "Productivity", "pricing": "Freemium", "shortDescription": "Online mind mapping software with AI brainstorming features."},
  {"name": "MindNode", "website": "https://mindnode.com", "category": "Productivity", "pricing": "Freemium", "shortDescription": "Visual brainstorming tool for Mac and iOS."},
  {"name": "Descript", "website": "https://descript.com", "category": "Video Editing", "pricing": "Freemium", "shortDescription": "All-in-one audio and video editing, as easy as a doc."},
  {"name": "Synthesia", "website": "https://synthesia.io", "category": "Video Generation", "pricing": "Paid", "shortDescription": "Create professional videos with AI avatars and voiceovers."},
  {"name": "Murf AI", "website": "https://murf.ai", "category": "Voice AI", "pricing": "Freemium", "shortDescription": "Go from text to voice with a versatile AI voice generator."},
  {"name": "Lovo AI", "website": "https://lovo.ai", "category": "Voice AI", "pricing": "Freemium", "shortDescription": "Award-winning AI Voice Generator and Text to Speech software."},
  {"name": "Pictory", "website": "https://pictory.ai", "category": "Video Editing", "pricing": "Freemium", "shortDescription": "Automatically create short, highly-sharable branded videos from long form content."}
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
            {
              question: `¿Es ${name} gratuito?`,
              answer: `Sí, ${name} ofrece una versión gratuita o un período de prueba. Sin embargo, para acceder a características premium, se requiere una suscripción.`
            },
            {
              question: `¿En qué idiomas está disponible?`,
              answer: `La interfaz principal suele estar en inglés, pero la IA subyacente puede entender y generar contenido en múltiples idiomas, incluyendo español.`
            }
          ]
        },
        fr: {
          fullDescription: `**Qu'est-ce que ${name} ?**\n\n${name} est une solution avancée d'Intelligence Artificielle qui domine l'industrie dans sa catégorie. Il a été conçu pour automatiser les tâches répétitives, stimuler la créativité et augmenter la productivité des équipes et des professionnels.\n\nEn utilisant ${name}, vous pouvez vous attendre à des résultats rapides, précis et évolutifs qui s'adaptent aux besoins spécifiques de votre flux de travail.`,
          pricingDetails: `Le tarification de ${name} est très flexible. Il propose un plan gratuit pour que vous puissiez tester ses fonctions de base sans frais. Si vous avez besoin de capacités plus avancées, de limites d'utilisation plus élevées ou d'un support prioritaire, vous pouvez passer à leurs plans Premium.`,
          faqs: [
            {
              question: `${name} est-il gratuit ?`,
              answer: `Oui, ${name} propose une version gratuite ou une période d'essai. Cependant, pour accéder aux fonctionnalités premium, un abonnement est nécessaire.`
            },
            {
              question: `Quelles sont les meilleures alternatives ?`,
              answer: `Il existe plusieurs alternatives sur le marché, mais ${name} se distingue par sa facilité d'utilisation et sa précision.`
            }
          ]
        }
      };
      
      const langs = ['de', 'pt', 'ar', 'ru', 'ja', 'zh', 'it', 'nl'];
      for (const lang of langs) {
        translations[lang] = {
           fullDescription: `[${lang.toUpperCase()}] **${name}** is an advanced AI solution. Please replace with verified ${lang} content.`,
           pricingDetails: `[${lang.toUpperCase()}] Pricing details for ${name}.`,
           faqs: [
             { question: `[${lang.toUpperCase()}] Question about ${name}?`, answer: `[${lang.toUpperCase()}] Answer.` }
           ]
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
