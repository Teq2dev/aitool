import sanitizeHtmlLib from 'sanitize-html';

const defaultOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span', 'img'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
    '*': ['class', 'id', 'role']
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesAppliedToAttributes: ['href', 'src'],
  allowProtocolRelative: true
};

/**
 * Server-safe HTML sanitizer for Next.js (SSR & Node.js compatible).
 * Prevents Stored XSS by stripping scripts, event handlers, and unsafe protocols.
 */
export function sanitizeHtml(html) {
  if (!html || typeof html !== 'string') return '';
  return sanitizeHtmlLib(html, defaultOptions);
}

export default sanitizeHtml;
