const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const uri = process.env.MONGODB_URI || "mongodb+srv://test:test12345@cluster0.bquyl.mongodb.net/aitools?retryWrites=true&w=majority";

const sampleBlogs = [
  {
    _id: "blog-1",
    title: "10 Best Free AI Tools to Boost Your Productivity in 2026",
    slug: "10-best-free-ai-tools-boost-productivity-2026",
    excerpt: "Discover top-rated free artificial intelligence tools for writing, research, automation, and design to supercharge your daily workflow.",
    content: "Artificial Intelligence is transforming how we work. From automated drafting to instant research synthesis, AI tools are essential for modern professionals...",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60",
    category: "Productivity",
    author: "AI Expert Team",
    readTime: 5,
    views: 1420,
    featured: true,
    status: "published",
    publishedAt: new Date("2026-01-15T10:00:00Z"),
    createdAt: new Date("2026-01-15T10:00:00Z"),
    updatedAt: new Date("2026-01-15T10:00:00Z")
  },
  {
    _id: "blog-2",
    title: "How to Generate Professional Artwork Using Midjourney & Free Alternatives",
    slug: "generate-professional-artwork-midjourney-free-alternatives",
    excerpt: "Learn prompt engineering secrets and explore top free generative image tools like Leonardo.ai and Playground AI.",
    content: "Generative AI artwork has reached photorealistic fidelity. In this tutorial, we explore prompting techniques for Midjourney and free alternatives...",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60",
    category: "Image Generation",
    author: "Creative Team",
    readTime: 7,
    views: 980,
    featured: true,
    status: "published",
    publishedAt: new Date("2026-02-01T14:30:00Z"),
    createdAt: new Date("2026-02-01T14:30:00Z"),
    updatedAt: new Date("2026-02-01T14:30:00Z")
  },
  {
    _id: "blog-3",
    title: "Top AI Coding Assistants for Developers: GitHub Copilot vs Free Alternatives",
    slug: "top-ai-coding-assistants-developers-copilot-vs-free",
    excerpt: "A comprehensive breakdown of free AI code completion tools, IDE extensions, and automated code reviewers.",
    content: "Software engineering is evolving rapidly with AI pair programming. We analyze Codeium, Tabnine, and open-source models...",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    category: "Development",
    author: "Dev Editor",
    readTime: 6,
    views: 2150,
    featured: true,
    status: "published",
    publishedAt: new Date("2026-02-10T09:15:00Z"),
    createdAt: new Date("2026-02-10T09:15:00Z"),
    updatedAt: new Date("2026-02-10T09:15:00Z")
  },
  {
    _id: "blog-4",
    title: "The Ultimate Guide to Free AI Writing & Copywriting Tools",
    slug: "ultimate-guide-free-ai-writing-copywriting-tools",
    excerpt: "How to craft compelling marketing copy, blog posts, and email newsletters using cutting-edge free AI writers.",
    content: "Content creation has never been faster. Learn how to leverage free LLM tools for marketing and SEO copywriting...",
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60",
    category: "Writing",
    author: "Content Lead",
    readTime: 4,
    views: 840,
    featured: false,
    status: "published",
    publishedAt: new Date("2026-02-18T11:20:00Z"),
    createdAt: new Date("2026-02-18T11:20:00Z"),
    updatedAt: new Date("2026-02-18T11:20:00Z")
  },
  {
    _id: "blog-5",
    title: "Best Free AI Voice Generators and Audio Editing Software",
    slug: "best-free-ai-voice-generators-audio-editing-software",
    excerpt: "Explore realistic text-to-speech voiceovers, background noise removal, and automated audio mastering.",
    content: "Audio production is easier than ever with specialized AI voice synthesis tools. Here are the top free tools tested...",
    coverImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=60",
    category: "Audio",
    author: "Media Tech",
    readTime: 5,
    views: 1120,
    featured: false,
    status: "published",
    publishedAt: new Date("2026-02-22T16:00:00Z"),
    createdAt: new Date("2026-02-22T16:00:00Z"),
    updatedAt: new Date("2026-02-22T16:00:00Z")
  }
];

async function seedBlogs() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const blogsCollection = db.collection('blogs');

    for (const blog of sampleBlogs) {
      await blogsCollection.updateOne(
        { slug: blog.slug },
        { $set: blog },
        { upsert: true }
      );
    }
    console.log('✅ Successfully seeded 5 published blogs into MongoDB!');
  } catch (err) {
    console.error('Error seeding blogs:', err);
  } finally {
    await client.close();
  }
}

seedBlogs();
