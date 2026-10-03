/**
 * lib/conversionConfig.js
 * Centralized backend conversion service configuration and dispatcher.
 */

import { validateConversionFile } from './fileLimits';

export const CONVERSION_SERVICE_URL = (
  process.env.CONVERSION_SERVICE_URL || 
  process.env.OCR_SERVICE_URL || 
  'http://127.0.0.1:8000'
).replace(/\/$/, '');

/**
 * Obtains an OpenID Connect (OIDC) ID token from the Google Cloud metadata server.
 * When running inside Cloud Run, this allows authenticating to private Cloud Run services.
 * In local development, it returns null without overhead.
 */
let cachedIdToken = null;
let tokenExpiresAt = 0;

export async function getCloudRunIdToken(targetAudience) {
  // Only attempt metadata lookup if target is a remote HTTPS Cloud Run URL
  if (!targetAudience || !targetAudience.startsWith('https://')) {
    return null;
  }

  // Use cached token if still valid (tokens are valid for 1 hour; cache for 50 mins)
  if (cachedIdToken && Date.now() < tokenExpiresAt) {
    return cachedIdToken;
  }

  try {
    const metadataUrl = `http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=${encodeURIComponent(
      targetAudience
    )}`;
    const res = await fetch(metadataUrl, {
      headers: { 'Metadata-Flavor': 'Google' },
      signal: AbortSignal.timeout(1500),
    });

    if (res.ok) {
      const token = await res.text();
      cachedIdToken = token.trim();
      tokenExpiresAt = Date.now() + 50 * 60 * 1000;
      return cachedIdToken;
    }
  } catch (e) {
    // Expected to fail locally or outside GCP environment
  }
  return null;
}

/**
 * Standardized forwarder to the heavy document conversion service.
 * @param {Request} request - Incoming Next.js request
 * @param {string} endpoint - Target endpoint path (e.g. '/pdf-to-powerpoint')
 * @param {string} defaultFilename - Fallback filename for Content-Disposition
 * @param {string} contentType - Output Content-Type
 * @returns {Promise<Response>}
 */
export async function forwardToConversionService(request, endpoint, defaultFilename, contentType) {
  const startTime = Date.now();
  const requestId = request.headers.get('x-cloud-trace-context') || `req_${Date.now()}`;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const fileSize = file && typeof file !== 'string' ? file.size : 0;

    // Pre-flight resource validation before invoking Cloud Run
    const validation = await validateConversionFile(file, endpoint);
    if (!validation.valid) {
      console.warn(
        `[Conversion Rejected] reqId=${requestId} endpoint=${endpoint} status=${validation.status} reason=${validation.error}`
      );
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: validation.status || 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const targetUrl = `${CONVERSION_SERVICE_URL}${endpoint}`;
    
    // Automatically attach OIDC ID Token if service-to-service auth is needed
    const headers = {};
    const idToken = await getCloudRunIdToken(CONVERSION_SERVICE_URL);
    if (idToken) {
      headers['Authorization'] = `Bearer ${idToken}`;
    }

    const backendRes = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: formData,
    });


    const duration = Date.now() - startTime;

    if (!backendRes.ok) {
      const errorData = await backendRes.json().catch(() => ({}));
      console.error(
        `[Conversion Error] reqId=${requestId} endpoint=${endpoint} status=${backendRes.status} duration=${duration}ms error=${errorData.error || errorData.detail || 'unknown'}`
      );
      
      return new Response(
        JSON.stringify({ 
          error: errorData.error || errorData.detail || 'Conversion service encountered an error. Please check your document and try again.' 
        }),
        { 
          status: backendRes.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const buffer = await backendRes.arrayBuffer();
    const contentDisposition = backendRes.headers.get('Content-Disposition') || `attachment; filename="${defaultFilename}"`;

    console.log(
      `[Conversion Success] reqId=${requestId} endpoint=${endpoint} inSize=${fileSize} outSize=${buffer.byteLength} duration=${duration}ms`
    );

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
      },
    });
  } catch (err) {
    const duration = Date.now() - startTime;
    console.error(
      `[Conversion Exception] reqId=${requestId} endpoint=${endpoint} duration=${duration}ms error=${err.message}`
    );

    // Return safe user-facing message, never exposing raw internal socket or network details
    return new Response(
      JSON.stringify({ 
        error: 'Conversion service is temporarily unavailable. Please try again shortly.' 
      }),
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
