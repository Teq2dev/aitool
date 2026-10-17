/**
 * lib/vertexGeminiClient.js
 * 
 * Production-ready Vertex AI Google Gemini Client for Multimodal Image-to-Table Extraction.
 * 
 * Features:
 * - Uses Google Gemini via Vertex AI for visual table comprehension and structured extraction.
 * - Zero reliance on external OCR engines (no PaddleOCR, Tesseract, or Table Transformer).
 * - Multimodal input (inlineData JPEG/PNG/WebP base64 + extraction prompt).
 * - Schema-constrained JSON generation (generationConfig.responseSchema).
 * - Automatic token acquisition:
 *     1. Checks VERTEX_AI_CREDENTIALS / GCP_SERVICE_ACCOUNT_KEY (env JSON)
 *     2. Checks GOOGLE_APPLICATION_CREDENTIALS (env file path)
 *     3. Checks local service-account key at C:/Users/dparw/Desktop/gen-lang-client.json (if present)
 *     4. Falls back to GoogleAuth (Application Default Credentials on Google Cloud Run)
 * - Pacing & Rate-limiting: enforces >= 1000ms inter-request spacing and exponential backoff.
 * - Preserves empty cells, table order, row/column alignment, and flags uncertain cells.
 */

import https from 'https';
import crypto from 'crypto';
import fs from 'fs';

// ── Configuration ─────────────────────────────────────────────────────────────

export const VERTEX_CONFIG = {
  projectId: process.env.VERTEX_AI_PROJECT_ID || process.env.GCP_PROJECT_ID || 'gen-lang-client-0659468620',
  location: process.env.VERTEX_AI_LOCATION || process.env.GCP_LOCATION || 'us-central1',
  model: process.env.VERTEX_AI_MODEL || 'gemini-2.5-flash',
  maxRetries: 3,
  baseBackoffMs: 2000,
  maxBackoffMs: 20000,
  minRequestIntervalMs: 1000,
  requestTimeoutMs: 60000,
};

// ── Table Extraction OpenAPI Schema ──────────────────────────────────────────

export const TABLE_EXTRACTION_SCHEMA = {
  type: 'OBJECT',
  properties: {
    hasTables: {
      type: 'BOOLEAN',
      description: 'True if at least one structured table is visible in the image, false otherwise.',
    },
    tables: {
      type: 'ARRAY',
      description: 'List of all extracted tables visible in the image.',
      items: {
        type: 'OBJECT',
        properties: {
          id: {
            type: 'STRING',
            description: 'Unique table identifier, e.g. table_1, table_2.',
          },
          name: {
            type: 'STRING',
            description: 'Descriptive title or sheet name for the table (e.g. Balance Sheet, Itemized Invoice, Schedule A).',
          },
          headers: {
            type: 'ARRAY',
            description: 'Column header names in left-to-right order. Use empty string for unlabelled columns.',
            items: { type: 'STRING' },
          },
          rows: {
            type: 'ARRAY',
            description: 'Data rows in visual top-to-bottom order. Each row is an array of cell values matching the headers.',
            items: {
              type: 'ARRAY',
              items: { type: 'STRING' },
            },
          },
          uncertainCells: {
            type: 'ARRAY',
            description: 'List of cells where text was blurry, faded, obstructed, or ambiguous.',
            items: {
              type: 'OBJECT',
              properties: {
                row: { type: 'INTEGER', description: '0-based row index in rows array' },
                col: { type: 'INTEGER', description: '0-based column index' },
                header: { type: 'STRING', description: 'Associated column header name' },
                extractedValue: { type: 'STRING', description: 'Best-effort extracted value' },
                reason: { type: 'STRING', description: 'Reason for uncertainty (e.g. blurry, faded, low-contrast, smudge)' },
              },
              required: ['row', 'col', 'extractedValue'],
            },
          },
        },
        required: ['id', 'name', 'headers', 'rows'],
      },
    },
    notes: {
      type: 'STRING',
      description: 'General observations about table layout, quality, or visual anomalies.',
    },
  },
  required: ['hasTables', 'tables'],
};

// ── Extraction Prompt ────────────────────────────────────────────────────────

export const SYSTEM_EXTRACTION_PROMPT = `You are a high-precision document image analysis and table extraction engine powered by Google Gemini Vision.
Your job is to examine the uploaded image, identify all structured tabular data, and extract every table into structured JSON.

STRICT EXTRACTION INVARIANTS:
1. Extract ALL visible tables. Do not stop at the first table if multiple tables appear.
2. Preserve exact row and column positions, boundaries, and visual order (top-to-bottom, left-to-right).
3. Identify column headers. If a table has no explicit header, use the first data row or meaningful generic column names.
4. Faithfully preserve empty cells as empty strings (""). Do not shift adjacent cells to fill gaps.
5. Faithfully transcribe text, numbers, dates, percentages, and currencies ($ € £ ¥ ₹) exactly as printed.
6. DO NOT silently correct spelling, grammar, mathematical sums, or formatting discrepancies.
7. DO NOT guess unreadable, blurry, faded, or cut-off content. If text is ambiguous, transcribe your best interpretation and record the cell in the "uncertainCells" array with row, col, and the reason.
8. If the image contains NO tables (e.g. a general landscape photo, a plain paragraph of text with no tabular columns), set "hasTables": false and "tables": [].
9. Output pure structured JSON adhering strictly to the provided responseSchema.`;

// ── Pacing and Token Cache State ─────────────────────────────────────────────

let cachedToken = null;
let tokenExpiresAt = 0;
let lastRequestCompletedAt = 0;

function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Obtain an OAuth2 access token for Vertex AI.
 */
export async function getVertexAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && tokenExpiresAt > now + 300) {
    return cachedToken;
  }

  // 1. Check env JSON string: VERTEX_AI_CREDENTIALS or GCP_SERVICE_ACCOUNT_KEY
  let keyData = null;
  const envJson = process.env.VERTEX_AI_CREDENTIALS || process.env.GCP_SERVICE_ACCOUNT_KEY;
  if (envJson) {
    try {
      keyData = JSON.parse(envJson);
    } catch (e) {
      console.warn('[VertexClient] Failed to parse credentials from environment JSON');
    }
  }

  // 2. Check GOOGLE_APPLICATION_CREDENTIALS file path
  if (!keyData && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    try {
      const p = process.env.GOOGLE_APPLICATION_CREDENTIALS;
      if (fs.existsSync(p)) {
        keyData = JSON.parse(fs.readFileSync(p, 'utf8'));
      }
    } catch (e) {
      console.warn('[VertexClient] Failed to read GOOGLE_APPLICATION_CREDENTIALS path');
    }
  }

  // 3. Check legacy desktop key if present
  const desktopKey = 'C:/Users/dparw/Desktop/gen-lang-client.json';
  if (!keyData) {
    try {
      if (fs.existsSync(desktopKey)) {
        keyData = JSON.parse(fs.readFileSync(desktopKey, 'utf8'));
      }
    } catch (e) {
      // Ignored
    }
  }

  // If service account key is available, generate OAuth2 JWT token
  if (keyData && keyData.client_email && keyData.private_key) {
    return new Promise((resolve, reject) => {
      const header = { alg: 'RS256', typ: 'JWT' };
      const claim = {
        iss: keyData.client_email,
        scope: 'https://www.googleapis.com/auth/cloud-platform',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
      };

      const encodedHeader = base64UrlEncode(JSON.stringify(header));
      const encodedClaim = base64UrlEncode(JSON.stringify(claim));
      const signInput = `${encodedHeader}.${encodedClaim}`;

      const signer = crypto.createSign('RSA-SHA256');
      signer.update(signInput);
      const signature = signer
        .sign(keyData.private_key, 'base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

      const jwt = `${signInput}.${signature}`;
      const postData = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;

      const req = https.request(
        'https://oauth2.googleapis.com/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
          },
          timeout: 15000,
        },
        (res) => {
          const chunks = [];
          res.on('data', (c) => chunks.push(c));
          res.on('end', () => {
            try {
              const data = Buffer.concat(chunks).toString('utf8');
              const parsed = JSON.parse(data);
              if (parsed.access_token) {
                cachedToken = parsed.access_token;
                tokenExpiresAt = now + (parsed.expires_in || 3600);
                resolve(cachedToken);
              } else {
                reject(new Error(`OAuth error: ${data}`));
              }
            } catch (err) {
              reject(err);
            }
          });
        }
      );

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy(new Error('OAuth token request timeout'));
      });
      req.write(postData);
      req.end();
    });
  }

  // 4. Fallback: GoogleAuth (Application Default Credentials on Cloud Run / GCE)
  try {
    const { GoogleAuth } = await import('google-auth-library');
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    const client = await auth.getClient();
    const tokenRes = await client.getAccessToken();
    if (tokenRes && tokenRes.token) {
      cachedToken = tokenRes.token;
      tokenExpiresAt = now + 3500;
      return cachedToken;
    }
  } catch (authErr) {
    console.warn('[VertexClient] GoogleAuth fallback failed:', authErr.message);
  }

  throw new Error(
    'No valid Google Cloud / Vertex AI credentials found. Please set VERTEX_AI_CREDENTIALS or configure Application Default Credentials.'
  );
}

// ── Pacing Helper ─────────────────────────────────────────────────────────────

async function enforcePacing() {
  if (lastRequestCompletedAt > 0 && VERTEX_CONFIG.minRequestIntervalMs > 0) {
    const elapsed = Date.now() - lastRequestCompletedAt;
    if (elapsed < VERTEX_CONFIG.minRequestIntervalMs) {
      const waitMs = VERTEX_CONFIG.minRequestIntervalMs - elapsed;
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }
}

// ── HTTP Dispatcher with Retry ────────────────────────────────────────────────

function dispatchHttpsRequest(url, token, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
        timeout: VERTEX_CONFIG.requestTimeoutMs,
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf8');
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ statusCode: res.statusCode, headers: res.headers, body });
          } else {
            const err = new Error(`HTTP ${res.statusCode}: ${body.substring(0, 500)}`);
            err.statusCode = res.statusCode;
            reject(err);
          }
        });
      }
    );

    req.on('error', reject);
    req.on('timeout', () => {
      const timeoutErr = new Error(`Vertex AI request timeout after ${VERTEX_CONFIG.requestTimeoutMs}ms`);
      timeoutErr.code = 'ETIMEDOUT';
      req.destroy(timeoutErr);
    });

    req.write(postData);
    req.end();
  });
}

function isRetryable(err) {
  if (!err) return false;
  const status = err.statusCode;
  if (status === 429 || (status >= 500 && status <= 599)) return true;
  if (['ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED', 'EAI_AGAIN', 'ENOTFOUND'].includes(err.code)) return true;
  const msg = String(err.message || '');
  return msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('timeout') || msg.includes('hang up');
}

// ── Core Multimodal Gemini Table Extractor ────────────────────────────────────

/**
 * Extracts tables from an image buffer using Google Gemini through Vertex AI.
 * 
 * @param {Buffer} imageBuffer - Raw image buffer (JPEG, PNG, WebP)
 * @param {string} mimeType - Image MIME type (e.g. 'image/jpeg', 'image/png')
 * @param {object} [options] - Optional override parameters
 * @returns {Promise<{ hasTables: boolean, tables: Array, notes?: string, model: string }>}
 */
export async function extractTablesWithVertexGemini(imageBuffer, mimeType = 'image/jpeg', options = {}) {
  const base64Data = imageBuffer.toString('base64');
  const prompt = options.customPrompt || 'Extract all visible tables from this image following the instructions.';

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            inlineData: {
              mimeType,
              data: base64Data,
            },
          },
          {
            text: `${SYSTEM_EXTRACTION_PROMPT}\n\nTask: ${prompt}`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.1,
      responseMimeType: 'application/json',
      responseSchema: TABLE_EXTRACTION_SCHEMA,
    },
  };

  const endpointUrl = `https://${VERTEX_CONFIG.location}-aiplatform.googleapis.com/v1/projects/${VERTEX_CONFIG.projectId}/locations/${VERTEX_CONFIG.location}/publishers/google/models/${VERTEX_CONFIG.model}:generateContent`;
  const postData = JSON.stringify(payload);

  let attempt = 0;
  const maxRetries = options.maxRetries || VERTEX_CONFIG.maxRetries;

  while (attempt < maxRetries) {
    try {
      attempt++;
      await enforcePacing();

      const token = options.mockToken || (await getVertexAccessToken());
      const response = await dispatchHttpsRequest(endpointUrl, token, postData);
      lastRequestCompletedAt = Date.now();

      const parsed = JSON.parse(response.body);
      const candidate = parsed.candidates?.[0];

      if (!candidate || !candidate.content?.parts?.[0]?.text) {
        throw new Error(`Empty response candidate from Vertex AI: ${response.body.substring(0, 300)}`);
      }

      const rawText = candidate.content.parts[0].text;
      let extractedData;
      try {
        extractedData = JSON.parse(rawText);
      } catch (e) {
        throw new Error(`Failed to parse model JSON output: ${e.message}. Raw: ${rawText.substring(0, 300)}`);
      }

      return validateAndNormalizeExtractionResult(extractedData, VERTEX_CONFIG.model);
    } catch (err) {
      lastRequestCompletedAt = Date.now();
      const retryable = isRetryable(err);

      if (attempt >= maxRetries || !retryable) {
        throw err;
      }

      const backoffMs = Math.min(
        VERTEX_CONFIG.maxBackoffMs,
        VERTEX_CONFIG.baseBackoffMs * Math.pow(2, attempt - 1) + Math.round(Math.random() * 500)
      );

      console.warn(`[VertexGemini] Retryable error on attempt ${attempt}/${maxRetries}: ${err.message}. Waiting ${backoffMs}ms...`);
      await new Promise((r) => setTimeout(r, backoffMs));
    }
  }

  throw new Error(`Vertex AI table extraction failed after ${maxRetries} attempts.`);
}

// ── Validation and Result Normalization ───────────────────────────────────────

/**
 * Validates and normalizes the structured extraction result from Gemini.
 * Ensures data integrity, fills missing cells, and bounds dimensions.
 */
export function validateAndNormalizeExtractionResult(rawResult, modelName = VERTEX_CONFIG.model) {
  if (!rawResult || typeof rawResult !== 'object') {
    return {
      hasTables: false,
      tables: [],
      notes: 'No structured response returned from model',
      model: modelName,
    };
  }

  const hasTables = Boolean(rawResult.hasTables && Array.isArray(rawResult.tables) && rawResult.tables.length > 0);
  if (!hasTables) {
    return {
      hasTables: false,
      tables: [],
      notes: rawResult.notes || 'No tabular data detected in image',
      model: modelName,
    };
  }

  const normalizedTables = rawResult.tables
    .filter((tbl) => tbl && typeof tbl === 'object')
    .map((tbl, index) => {
      const id = String(tbl.id || `table_${index + 1}`).trim();
      const name = String(tbl.name || `Table ${index + 1}`).trim().substring(0, 31);
      const rawHeaders = Array.isArray(tbl.headers) ? tbl.headers : [];
      const rawRows = Array.isArray(tbl.rows) ? tbl.rows : [];

      // Determine max columns across headers and rows
      let maxCols = rawHeaders.length;
      rawRows.forEach((row) => {
        if (Array.isArray(row) && row.length > maxCols) {
          maxCols = row.length;
        }
      });

      // Normalize headers: pad to maxCols if necessary
      const headers = [];
      for (let c = 0; c < maxCols; c++) {
        headers.push(rawHeaders[c] !== undefined && rawHeaders[c] !== null ? String(rawHeaders[c]).trim() : `Column ${c + 1}`);
      }

      // Normalize rows: ensure each row is array of strings padded to maxCols
      const rows = rawRows.map((row) => {
        if (!Array.isArray(row)) return new Array(maxCols).fill('');
        const normalizedRow = [];
        for (let c = 0; c < maxCols; c++) {
          const val = row[c];
          normalizedRow.push(val !== undefined && val !== null ? String(val).trim() : '');
        }
        return normalizedRow;
      });

      // Normalize uncertain cells
      const uncertainCells = Array.isArray(tbl.uncertainCells)
        ? tbl.uncertainCells
            .filter((u) => u && typeof u === 'object')
            .map((u) => ({
              row: Number.isInteger(u.row) ? u.row : 0,
              col: Number.isInteger(u.col) ? u.col : 0,
              header: String(u.header || headers[u.col] || ''),
              extractedValue: String(u.extractedValue || ''),
              reason: String(u.reason || 'Low visual confidence'),
            }))
        : [];

      return {
        id,
        name,
        headers,
        rows,
        rowCount: rows.length,
        colCount: headers.length,
        uncertainCells,
      };
    });

  return {
    hasTables: normalizedTables.length > 0,
    tables: normalizedTables,
    notes: rawResult.notes || '',
    model: modelName,
  };
}
