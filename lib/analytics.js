/**
 * lib/analytics.js
 * 
 * Central Google Tag Manager analytics event dispatcher.
 * Pushes custom events directly to window.dataLayer for GTM container consumption.
 * 
 * Architectural rules:
 * 1. Pushes to window.dataLayer ONLY (no direct gtag() dispatch).
 * 2. Enforces unique operationId per attempt to prevent duplicate starts/completions.
 * 3. Allows legitimate subsequent operations (same file or recalculation) to be tracked.
 * 4. Preserves SSR safety (no-op on server).
 */

// In-memory set of completed operation IDs to prevent duplicate completions
const completedOperations = new Set();
const startedOperations = new Set();

/**
 * Generates a unique operation ID for tracking an individual operation lifecycle.
 * @returns {string} Unique operation ID
 */
export function generateOperationId() {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Tracks the start of an operation by pushing 'tool_started' to window.dataLayer.
 * 
 * @param {Object} params
 * @param {string} params.tool_name - Machine-readable tool slug (e.g., 'jpg-to-excel', 'emi-calculator')
 * @param {string} params.tool_category - Category ('document-conversion' | 'pdf-tools' | 'image-tools' | 'calculators')
 * @param {string} params.operationId - Unique ID for this operation attempt
 */
export function trackToolStarted({ tool_name, tool_category, operationId }) {
  if (typeof window === 'undefined') return;

  if (operationId && startedOperations.has(operationId)) {
    return; // Prevent duplicate tool_started for same operation attempt
  }

  if (operationId) {
    startedOperations.add(operationId);
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'tool_started',
    tool_name,
    tool_category,
    operation_id: operationId,
  });
}

/**
 * Tracks the successful completion of an operation by pushing 'tool_completed' to window.dataLayer.
 * 
 * @param {Object} params
 * @param {string} params.tool_name - Machine-readable tool slug
 * @param {string} params.tool_category - Category ('document-conversion' | 'pdf-tools' | 'image-tools' | 'calculators')
 * @param {string} params.operationId - Unique ID for this operation attempt
 */
export function trackToolCompleted({ tool_name, tool_category, operationId }) {
  if (typeof window === 'undefined') return;

  if (operationId && completedOperations.has(operationId)) {
    return; // Prevent duplicate tool_completed for same operation attempt
  }

  if (operationId) {
    completedOperations.add(operationId);
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'tool_completed',
    tool_name,
    tool_category,
    operation_id: operationId,
  });
}
