/**
 * lib/ipRateLimiter.js
 * 
 * Lightweight, in-memory sliding window rate limiter and concurrency limiter
 * for serverless/container endpoints.
 */

export function createSlidingWindowLimiter({ windowMs = 60000, maxRequests = 15 } = {}) {
  const history = new Map();

  return {
    check(key = '127.0.0.1') {
      const now = Date.now();
      const timestamps = history.get(key) || [];
      const valid = timestamps.filter((t) => now - t < windowMs);

      if (valid.length >= maxRequests) {
        history.set(key, valid);
        const oldest = valid[0];
        const retryAfter = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
        return { limited: true, retryAfter };
      }

      valid.push(now);
      history.set(key, valid);

      if (history.size > 2000) {
        for (const [k, v] of history.entries()) {
          const act = v.filter((t) => now - t < windowMs);
          if (act.length === 0) history.delete(k);
          else history.set(k, act);
        }
      }

      return { limited: false, retryAfter: 0 };
    },
    reset() {
      history.clear();
    },
    size() {
      return history.size;
    },
    maxRequests,
    windowMs,
  };
}

export function createConcurrencyLimiter(maxConcurrent = 5) {
  let active = 0;

  return {
    acquire() {
      if (active >= maxConcurrent) {
        return false;
      }
      active++;
      return true;
    },
    release() {
      active = Math.max(0, active - 1);
    },
    getActive() {
      return active;
    },
    reset() {
      active = 0;
    },
    maxConcurrent,
  };
}
