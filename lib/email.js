import { Resend } from 'resend';

export const NOTIFICATION_DESTINATION_EMAIL = 'bestaitoolsfree111@gmail.com';
export const NOTIFICATION_SUBJECT = 'New Contact Us Message — BestAIToolsFree';

/**
 * Escapes HTML characters to prevent HTML/script injection in email clients.
 */
function escapeHtml(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Sends a transactional contact notification email via Resend.
 *
 * @param {Object} params
 * @param {string} params.name - Visitor's name
 * @param {string} params.email - Visitor's email address
 * @param {string} params.country - Visitor's country
 * @param {string} params.description - Message content
 * @param {Date|string} [params.createdAt] - Submission timestamp
 * @returns {Promise<{success: boolean, id?: string, reason?: string, error?: string}>}
 */
export async function sendContactNotificationEmail({ name, email, country, description, createdAt }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey.trim().length === 0) {
    console.warn('[Email] RESEND_API_KEY is not configured. Email notification skipped.');
    return {
      success: false,
      reason: 'unconfigured_api_key',
      error: 'RESEND_API_KEY environment variable is not configured.',
    };
  }

  // Sender address: must come from project's verified domain in production
  // Example: BestAIToolsFree <notifications@bestaitoolsfree.com>
  // or testing address: BestAIToolsFree <onboarding@resend.dev>
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'BestAIToolsFree <notifications@bestaitoolsfree.com>';

  const timestamp = createdAt
    ? new Date(createdAt).toUTCString()
    : new Date().toUTCString();

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCountry = escapeHtml(country);
  const safeDescription = escapeHtml(description).replace(/\n/g, '<br/>');

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(NOTIFICATION_SUBJECT)}</title>
</head>
<body style="margin: 0; padding: 24px 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <!-- Header -->
    <tr>
      <td style="background-color: #2563eb; padding: 24px 28px; text-align: left;">
        <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">
          New Contact Us Message
        </h1>
        <p style="margin: 4px 0 0 0; color: #dbeafe; font-size: 13px;">
          BestAIToolsFree.com
        </p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 28px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px; border-collapse: separate; border-spacing: 0;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600; width: 120px; vertical-align: top;">Name:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600; width: 120px; vertical-align: top;">Email:</td>
            <td style="padding: 8px 0; color: #2563eb; font-size: 14px;">
              <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: underline;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600; width: 120px; vertical-align: top;">Country:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${safeCountry}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 13px; font-weight: 600; width: 120px; vertical-align: top;">Submitted At:</td>
            <td style="padding: 8px 0; color: #475569; font-size: 13px;">${timestamp}</td>
          </tr>
        </table>

        <!-- Message Box -->
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px 20px; margin-top: 12px;">
          <h2 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em;">
            Message
          </h2>
          <div style="font-size: 14px; line-height: 1.6; color: #1e293b; word-break: break-word;">
            ${safeDescription}
          </div>
        </div>

        <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #64748b; line-height: 1.5;">
          <strong>Tip:</strong> Click <em>Reply</em> in your email client to respond directly to <strong>${safeEmail}</strong>.
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f8fafc; padding: 16px 28px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
        Notification sent from the Contact Us form at <a href="https://www.bestaitoolsfree.com" style="color: #64748b; text-decoration: none;">BestAIToolsFree.com</a>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const plainTextContent = `
New Contact Us Message — BestAIToolsFree
========================================

Name: ${name}
Email: ${email}
Country: ${country}
Submitted At: ${timestamp}

Message:
--------
${description}

----------------------------------------
Reply-To: ${email}
(You can reply directly to this notification email to respond to the sender)
  `.trim();

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [NOTIFICATION_DESTINATION_EMAIL],
      replyTo: email,
      subject: NOTIFICATION_SUBJECT,
      html: htmlContent,
      text: plainTextContent,
    });

    if (error) {
      console.error('[Email] Resend API error:', error.message || error);
      return {
        success: false,
        error: error.message || 'Resend API returned an error',
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (err) {
    console.error('[Email] Unexpected email dispatch failure:', err?.message || 'Unknown error');
    return {
      success: false,
      error: err?.message || 'Unexpected email dispatch exception',
    };
  }
}
