import fs from 'fs';
import path from 'path';

let v6Cache = null;

export function getV6Cache() {
  if (v6Cache) return v6Cache;
  try {
    const filePath = path.join(process.cwd(), 'v6_field_embeddings_cache.json');
    const data = fs.readFileSync(filePath, 'utf8');
    v6Cache = JSON.parse(data);
    return v6Cache;
  } catch (err) {
    console.error('Error loading V6 embeddings cache:', err);
    return {};
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

// Weights (Exact V2 Model)
const W_CAPABILITY = 0.60;
const W_DESC = 0.25;
const W_CAT = 0.10;
const W_SHORT_DESC = 0.05;

function isMissing(text) {
  if (!text) return true;
  if (typeof text !== 'string') return false;
  
  const t = text.toLowerCase().trim();
  const missingVals = [
    "no use cases", "", "none", "n/a", "not available", 
    "no description", "null", "undefined", "[]", "{}"
  ];
  return missingVals.includes(t);
}

function isDescriptionReliable(toolSlug, rawText) {
  if (!rawText) return false;
  const lowerDesc = rawText.toLowerCase();
  
  // Known corrupted texts from Data Quality Report
  if (lowerDesc.includes('github codespaces') || lowerDesc.includes('github actions')) {
    if (toolSlug !== 'github-copilot') {
      return false; // Corrupted
    }
  }
  
  return true;
}

function getValidUseCases(tool) {
  if (!tool.useCasesEmbs || tool.useCasesEmbs.length === 0) return [];
  return tool.useCasesEmbs.filter(uc => !isMissing(uc.text));
}

function calculateCategoryScore(catsA, catsB) {
  if (!catsA || !catsB || catsA.length === 0 || catsB.length === 0) return 0.0;
  const lowerA = catsA.map(c => c.toLowerCase());
  const lowerB = catsB.map(c => c.toLowerCase());
  const exactOverlap = lowerA.some(c => lowerB.includes(c));
  if (exactOverlap) return 1.0;
  const partialOverlap = lowerA.some(cA => lowerB.some(cB => cA.includes(cB) || cB.includes(cA)));
  if (partialOverlap) return 0.5;
  return 0.0;
}

function calculateMultiCapDirectional(ucsFrom, ucsTo) {
  if (!ucsFrom || ucsFrom.length === 0 || !ucsTo || ucsTo.length === 0) return { score: 0, sortedMatches: [] };

  const bestMatches = [];
  for (const ucFrom of ucsFrom) {
    let maxSim = 0;
    let bestTextTo = "-";
    for (const ucTo of ucsTo) {
      const sim = normalizeCos(cosineSimilarity(ucFrom.emb, ucTo.emb));
      if (sim > maxSim) {
        maxSim = sim;
        bestTextTo = ucTo.text;
      }
    }
    bestMatches.push({ ucFrom: ucFrom.text, ucTo: bestTextTo, sim: maxSim });
  }

  bestMatches.sort((a, b) => b.sim - a.sim);

  const sims = bestMatches.map(m => m.sim);
  const n = sims.length;

  let weightedScore = 0;
  let totalWeight = 0;

  if (n >= 1) {
    weightedScore += sims[0] * 0.50;
    totalWeight += 0.50;
  }
  if (n >= 2) {
    weightedScore += sims[1] * 0.25;
    totalWeight += 0.25;
  }
  if (n >= 3) {
    weightedScore += sims[2] * 0.15;
    totalWeight += 0.15;
  }
  if (n >= 4) {
    const remainingSims = sims.slice(3);
    const avgRemaining = remainingSims.reduce((a, b) => a + b, 0) / remainingSims.length;
    weightedScore += avgRemaining * 0.10;
    totalWeight += 0.10;
  }

  const score = totalWeight > 0 ? weightedScore / totalWeight : 0;
  return {
    score,
    sortedMatches: bestMatches
  };
}

function calculateToolSimilarityV2Clean(toolA, toolB) {
  // Description Reliability Check
  const isDescAReliable = isDescriptionReliable(toolA.slug, toolA.rawToolText);
  const isDescBReliable = isDescriptionReliable(toolB.slug, toolB.rawToolText);
  const descSim = (isDescAReliable && isDescBReliable) ? normalizeCos(cosineSimilarity(toolA.descEmb, toolB.descEmb)) : null;
  const shortDescSim = normalizeCos(cosineSimilarity(toolA.shortDescEmb, toolB.shortDescEmb));

  // Use Case Reliability Check
  const isCapAReliable = isDescAReliable; 
  const isCapBReliable = isDescBReliable;

  const validUcsA = getValidUseCases(toolA);
  const validUcsB = getValidUseCases(toolB);

  let capSim = null;
  let sortedMatches = [];
  let meaningfulCount = 0;

  if (isCapAReliable && isCapBReliable && validUcsA.length > 0 && validUcsB.length > 0) {
    const dirAtoB = calculateMultiCapDirectional(validUcsA, validUcsB);
    const dirBtoA = calculateMultiCapDirectional(validUcsB, validUcsA);
    capSim = (dirAtoB.score + dirBtoA.score) / 2;
    sortedMatches = dirAtoB.sortedMatches;
    
    // Product Breadth & Capability Coverage Metrics
    const meaningfulMatches = sortedMatches.filter(m => m.sim >= 0.50);
    meaningfulCount = meaningfulMatches.length;
  }

  const catScore = calculateCategoryScore(toolA.categories, toolB.categories);

  // Dynamic Renormalization
  let validWeights = 0;
  let scoreSum = 0;

  if (capSim !== null) {
    validWeights += W_CAPABILITY;
    scoreSum += capSim * W_CAPABILITY;
  }
  if (descSim !== null) {
    validWeights += W_DESC;
    scoreSum += descSim * W_DESC;
  }
  if (shortDescSim !== null) {
    validWeights += W_SHORT_DESC;
    scoreSum += shortDescSim * W_SHORT_DESC;
  }
  if (catScore !== null) {
    validWeights += W_CAT;
    scoreSum += catScore * W_CAT;
  }

  const finalScore = validWeights > 0 ? scoreSum / validWeights : 0;

  return {
    finalScore,
    capSim,
    meaningfulCount
  };
}

export async function getSimilarTools(targetSlug, limitStrong = 5, limitRelated = 3) {
  const cache = getV6Cache();
  const toolA = cache[targetSlug];
  
  if (!toolA) {
    console.log(`[similarTools] Cache miss for ${targetSlug}, using MongoDB fallback`);
    try {
      const { getCollection } = await import('./db');
      const toolsCollection = await getCollection('tools');
      const targetTool = await toolsCollection.findOne({ slug: targetSlug, status: 'approved' });
      
      if (!targetTool || !targetTool.categories || targetTool.categories.length === 0) {
        return { strongSimilar: [], relatedTools: [] };
      }
      
      const category = targetTool.categories[0];
      
      const fallbackTools = await toolsCollection
        .find({ 
          categories: category, 
          slug: { $ne: targetSlug },
          status: 'approved' 
        })
        .sort({ votes: -1, rating: -1 })
        .limit(limitStrong + limitRelated)
        .toArray();
        
      const formattedFallback = fallbackTools.map(t => ({
        slug: t.slug,
        name: t.name,
        shortDescription: t.shortDescription || '',
        logo: t.logo || '',
        categories: t.categories || [],
        pricing: t.pricing || [],
        finalScore: 0.5,
        capSim: null,
        meaningfulCount: 0,
        classification: 'RELATED'
      }));
      
      return { 
        strongSimilar: formattedFallback.slice(0, limitStrong), 
        relatedTools: formattedFallback.slice(limitStrong, limitStrong + limitRelated) 
      };
    } catch (e) {
      console.error('[similarTools] Fallback error:', e);
      return { strongSimilar: [], relatedTools: [] };
    }
  }

  const scoredB = [];
  const seenNames = new Set([toolA.name.toLowerCase().trim()]);

  for (const [slugB, toolB] of Object.entries(cache)) {
    const nameBLower = toolB.name.toLowerCase().trim();
    if (slugB === targetSlug || seenNames.has(nameBLower)) {
      continue;
    }

    const simMetrics = calculateToolSimilarityV2Clean(toolA, toolB);
    
    scoredB.push({
      slug: slugB,
      name: toolB.name,
      shortDescription: toolB.shortDescription || toolB.rawToolText?.substring(0, 100) || '',
      logo: toolB.logo || '',
      categories: toolB.categories || [],
      pricing: toolB.pricing || [],
      finalScore: simMetrics.finalScore,
      capSim: simMetrics.capSim,
      meaningfulCount: simMetrics.meaningfulCount
    });
    
    seenNames.add(nameBLower);
  }

  scoredB.sort((a, b) => b.finalScore - a.finalScore);

  const classified = scoredB.map(st => {
    let classification = 'INSUFFICIENT';
    if (st.capSim !== null && st.capSim > 0 && st.meaningfulCount >= 0) {
      classification = 'STRONG SIMILAR';
    } else if (st.finalScore > 0.40) {
      classification = 'RELATED';
    }
    return { ...st, classification };
  });

  const strongSimilar = classified.filter(t => t.classification === 'STRONG SIMILAR').slice(0, limitStrong);
  const relatedTools = classified.filter(t => t.classification === 'RELATED').slice(0, limitRelated);

  return { strongSimilar, relatedTools };
}
