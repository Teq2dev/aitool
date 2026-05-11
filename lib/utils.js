import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Robustly serializes data for Next.js Client Components.
 * Handles MongoDB ObjectIDs, Dates, and nested objects.
 */
export function serializeData(data) {
  if (data === null || data === undefined) return data;
  
  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => serializeData(item));
  }
  
  // Handle Dates
  if (data instanceof Date) {
    return data.toISOString();
  }
  
  // Handle Objects
  if (typeof data === 'object') {
    // Handle MongoDB ObjectID
    if (data._id && typeof data._id === 'object') {
      data = { ...data, _id: data._id.toString() };
    } else if (data.toString && data.constructor.name === 'ObjectId') {
      return data.toString();
    }
    
    const serialized = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        serialized[key] = serializeData(data[key]);
      }
    }
    return serialized;
  }
  
  return data;
}

