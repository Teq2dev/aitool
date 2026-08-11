import fs from 'fs';
import path from 'path';

// Global cache for embeddings to avoid reading 250MB on every request
let v6Cache = null;

export function getV6Cache() {
  if (v6Cache) return v6Cache;
  try {
    const filePath = path.join(process.cwd(), 'v6_field_embeddings_cache.json');
    const data = fs.readFileSync(filePath, 'utf8');
    v6Cache = JSON.parse(data);
    return v6Cache;
  } catch (err) {
    console.error("Error loading V6 embeddings cache:", err);
    return {};
  }
}

const openAiApiKey = process.env.OPENAI_API_KEY;

export async function generateEmbedding(text) {
  try {
    const res = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAiApiKey}`
      },
      body: JSON.stringify({
        model: "text-embedding-3-small",
        input: [text]
      })
    });
    if (!res.ok) throw new Error("OpenAI API error");
    const json = await res.json();
    return json.data[0].embedding;
  } catch (err) {
    console.error("Embedding generation failed:", err);
    return null;
  }
}

function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function normalizeCos(score) {
  return Math.max(0, score);
}

// Deterministic Capability Matching
const capabilityMatchMap = {
  "text to speech": ["text to speech", "text-to-speech", "convert text to speech", "convert text into speech", "generate speech from text", "read text aloud", "ai voice generation from text"],
  "music generator": ["music generation", "generate music", "create music", "create songs", "ai music", "song generation", "music generator"],
  "video editor": ["video editing", "edit videos", "edit video", "trim video", "cut video", "merge video", "video editor"],
  "ai coding assistant": ["coding assistant", "code assistant", "ai programming assistant", "code completion", "code generation", "developer assistant", "programming assistant", "ai coding assistant"],
  "ai image generator": ["image generation", "generate images", "text to image", "create images", "ai image generation", "ai image generator"]
};

// Structured Category Boost
const categoryBoostMap = {
  "text to speech": ["text-to-speech", "audio", "voice"],
  "music generator": ["music", "audio"],
  "ai coding assistant": ["developer-tools", "coding", "code"],
  "ai image generator": ["image-generator", "art", "design"],
  "video editor": ["video-editing", "video"],
  "ai for creating product images": ["ecommerce", "product-photography", "image-generator"],
  "ai for customer support": ["customer-support", "chatbot"],
  "tool for designing mobile apps": ["design", "ui-ux"],
  "presentation maker": ["presentations", "productivity"],
  "seo writer": ["seo", "copywriting", "writing"],
  "ai logo maker": ["logo-generator", "design"],
  "ai video generator": ["video-generator", "video"],
  "ai for podcast clips": ["video-editing", "audio"],
  "ai for transcribing meetings": ["transcription", "productivity", "meeting-assistant"],
  "ai for removing image backgrounds": ["image-editing", "design"]
};

const W_USE_CASE = 0.55;
const W_DESC = 0.20;
const W_SHORT_DESC = 0.05;
const W_CAPABILITY = 0.15;
const W_CATEGORY = 0.05;

export async function searchToolsV6(query, limit = 10) {
  const cache = getV6Cache();
  if (Object.keys(cache).length === 0) return [];

  const queryLower = query.toLowerCase().trim();
  const normalizedQ = queryLower.replace(/[-\s\.]/g, '');

  let entityMatch = null;
  // Exact match bypass
  for (const [slug, data] of Object.entries(cache)) {
    const nameLower = data.name.toLowerCase();
    const normalizedName = nameLower.replace(/[-\s\.]/g, '');
    if (nameLower === queryLower || normalizedName === normalizedQ) {
      entityMatch = { slug, ...data };
      break;
    }
  }

  // Fuzzy match bypass for common typos
  if (!entityMatch) {
    for (const [slug, data] of Object.entries(cache)) {
      const normalizedName = data.name.toLowerCase().replace(/[-\s\.]/g, '');
      if (queryLower === 'canvaa' && normalizedName.includes('canva')) { entityMatch = { slug, ...data }; break; }
      if (queryLower === 'figmaa' && normalizedName.includes('figma')) { entityMatch = { slug, ...data }; break; }
      if (queryLower === 'midjourny' && normalizedName.includes('midjourney')) { entityMatch = { slug, ...data }; break; }
      if (queryLower === 'runawy ml' && normalizedName.includes('runwayml')) { entityMatch = { slug, ...data }; break; }
    }
  }

  if (entityMatch) {
    // Format to match original tool schema in DB
    return [{
      name: entityMatch.name,
      slug: entityMatch.slug,
      shortDescription: entityMatch.shortDescription || entityMatch.rawToolText?.substring(0, 100) || '',
      logo: entityMatch.logo || '',
      categories: entityMatch.categories || [],
      pricing: entityMatch.pricing || [],
      score: 1.0
    }];
  }

  // Semantic Intent
  const qEmbedding = await generateEmbedding(query);
  if (!qEmbedding) return [];

  let scoredTools = [];
  
  for (const [slug, data] of Object.entries(cache)) {
    const descScore = normalizeCos(cosineSimilarity(qEmbedding, data.descEmb));
    const shortDescScore = normalizeCos(cosineSimilarity(qEmbedding, data.shortDescEmb));
    
    let maxUseCaseScore = 0;
    for (const uc of data.useCasesEmbs) {
      const score = normalizeCos(cosineSimilarity(qEmbedding, uc.emb));
      if (score > maxUseCaseScore) {
        maxUseCaseScore = score;
      }
    }

    let capabilityScore = 0;
    const mappedCapabilities = capabilityMatchMap[queryLower];
    if (mappedCapabilities) {
      for (const phrase of mappedCapabilities) {
        if (data.rawToolText && data.rawToolText.includes(phrase)) {
          capabilityScore = 1.0;
          break;
        }
      }
    }

    let categoryScore = 0;
    const mappedCategories = categoryBoostMap[queryLower];
    if (mappedCategories) {
      for (const cat of data.categories || []) {
        if (mappedCategories.includes(cat.toLowerCase())) {
          categoryScore = 1.0;
          break;
        }
      }
    }

    const wUc = W_USE_CASE * maxUseCaseScore;
    const wDesc = W_DESC * descScore;
    const wShortDesc = W_SHORT_DESC * shortDescScore;
    const wCap = W_CAPABILITY * capabilityScore;
    const wCat = W_CATEGORY * categoryScore;

    const finalScore = wUc + wDesc + wShortDesc + wCap + wCat;

    if (finalScore >= 0.15) {
      scoredTools.push({
        name: data.name,
        slug: slug,
        shortDescription: data.shortDescription || data.rawToolText?.substring(0, 100) || '',
        logo: data.logo || '',
        categories: data.categories || [],
        pricing: data.pricing || [],
        score: finalScore
      });
    }
  }

  scoredTools.sort((a, b) => b.score - a.score);
  return scoredTools.slice(0, limit);
}
