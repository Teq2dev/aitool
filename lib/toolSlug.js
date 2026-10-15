import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a clean, URL-safe base slug from any tool name.
 * Handles multilingual/non-ASCII names, accents, symbols, leading/trailing hyphens.
 */
export function sanitizeToolSlug(name) {
  if (!name || typeof name !== 'string') {
    return '';
  }

  const cleaned = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Strip diacritics / accent marks
    .replace(/[^a-z0-9]+/g, '-')     // Replace non-alphanumeric chars with hyphen
    .replace(/^-+|-+$/g, '');        // Strip leading & trailing hyphens

  return cleaned;
}

/**
 * Generates a collision-resistant unique slug against the tools collection.
 * If collision occurs, appends -2, -3, etc.
 * If name cannot produce Latin characters, falls back to a clean tool-{token} format.
 */
export async function generateUniqueToolSlug(name, toolsCollection) {
  let base = sanitizeToolSlug(name);
  if (!base || base === '-') {
    base = `tool-${uuidv4().substring(0, 8)}`;
  }

  let candidate = base;
  let counter = 1;

  while (await toolsCollection.findOne({ slug: candidate }, { projection: { _id: 1 } })) {
    counter++;
    candidate = `${base}-${counter}`;
    if (counter > 50) {
      candidate = `${base}-${uuidv4().substring(0, 8)}`;
      break;
    }
  }

  return candidate;
}
