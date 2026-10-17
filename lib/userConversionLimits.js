/**
 * lib/userConversionLimits.js
 * 
 * Server-side quota enforcement for JPG-to-Excel MVP:
 * Enforces strictly 1 successful conversion per user (by session email, visitor ID cookie, or IP).
 */

import crypto from 'crypto';
import { getCollection } from './db.js';

const inMemoryConvertedKeys = new Set();

/**
 * Checks whether the user has already performed a successful conversion.
 * 
 * @param {object} params
 * @param {string|null} params.email - Authenticated user email (if logged in)
 * @param {string|null} params.visitorId - Visitor cookie ID (for anonymous users)
 * @param {string|null} params.ip - Client IP address
 * @param {boolean} params.isAdmin - Admin bypass
 * @returns {Promise<{ allowed: boolean, reason?: string, identifier: string }>}
 */
export async function checkConversionLimit({
  email = null,
  visitorId = null,
  ip = '127.0.0.1',
  isAdmin = false,
}) {
  if (isAdmin) {
    return { allowed: true, identifier: 'admin' };
  }

  const normalizedEmail = email ? String(email).toLowerCase().trim() : null;
  const userIdentifier = normalizedEmail || visitorId || `ip_${ip}`;

  // 1. Fast in-memory check
  if (inMemoryConvertedKeys.has(userIdentifier)) {
    return {
      allowed: false,
      reason: 'Free limit reached: You have already used your 1 free AI table conversion. Please contact support or upgrade for additional conversions.',
      identifier: userIdentifier,
    };
  }

  // 2. Persistent MongoDB check
  try {
    const usageCollection = await getCollection('jpg_to_excel_usage');
    const query = [];
    if (normalizedEmail) {
      query.push({ email: normalizedEmail });
    }
    if (visitorId) {
      query.push({ visitorId });
    }
    if (ip && ip !== '127.0.0.1') {
      query.push({ ip });
    }

    if (query.length > 0) {
      const existing = await usageCollection.findOne({ $or: query });
      if (existing) {
        inMemoryConvertedKeys.add(userIdentifier);
        return {
          allowed: false,
          reason: 'Free limit reached: You have already used your 1 free AI table conversion. Please contact support or upgrade for additional conversions.',
          identifier: userIdentifier,
        };
      }
    }
  } catch (err) {
    console.warn('[ConversionLimits] DB lookup warning (using memory fallback):', err.message);
  }

  return { allowed: true, identifier: userIdentifier };
}

/**
 * Records a successful conversion to enforce the 1-conversion quota.
 */
export async function recordSuccessfulConversion({
  email = null,
  visitorId = null,
  ip = '127.0.0.1',
  isAdmin = false,
}) {
  if (isAdmin) return;

  const normalizedEmail = email ? String(email).toLowerCase().trim() : null;
  const userIdentifier = normalizedEmail || visitorId || `ip_${ip}`;

  inMemoryConvertedKeys.add(userIdentifier);

  try {
    const usageCollection = await getCollection('jpg_to_excel_usage');
    await usageCollection.updateOne(
      { userIdentifier },
      {
        $setOnInsert: {
          userIdentifier,
          email: normalizedEmail,
          visitorId,
          ip,
          convertedAt: new Date(),
        },
      },
      { upsert: true }
    );
  } catch (err) {
    console.warn('[ConversionLimits] DB record warning:', err.message);
  }
}

/**
 * Helper to reset in-memory cache for testing.
 */
export function resetConversionLimitsCache() {
  inMemoryConvertedKeys.clear();
}
