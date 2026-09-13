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


export function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function calcReduction(original, compressed) {
  if (!original || original === 0) return 0;
  return Math.round(((original - compressed) / original) * 100);
}

export function getFileSizeBucket(bytes) {
  const kb = bytes / 1024;
  if (kb < 100) return '<100kb';
  if (kb < 500) return '100-500kb';
  if (kb < 1024) return '500kb-1mb';
  if (kb < 5120) return '1-5mb';
  if (kb < 10240) return '5-10mb';
  return '>10mb';
}
