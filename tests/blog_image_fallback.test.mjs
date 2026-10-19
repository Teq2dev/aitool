import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Blogs listing page has image fallback and container styling for featured and latest cards', () => {
  const pagePath = path.resolve(process.cwd(), 'app/blogs/page.js');
  const content = fs.readFileSync(pagePath, 'utf8');

  // Verify featured cards image error handler
  assert(
    content.includes('data-fallback'),
    'app/blogs/page.js must have data-fallback check to prevent infinite fallback loops'
  );

  assert(
    content.includes("e.currentTarget.src = '/logo.jpg'"),
    'app/blogs/page.js must fall back to /logo.jpg on image load error'
  );

  // Verify container background styling for smooth loading/fallback display
  assert(
    content.includes('aspect-video overflow-hidden rounded-t-lg bg-gray-100'),
    'Card image wrapper must include a neutral background placeholder class'
  );
});

test('Blog detail page has image fallback and container styling for cover image', () => {
  const detailPath = path.resolve(process.cwd(), 'app/blogs/[slug]/BlogDetailClient.js');
  const content = fs.readFileSync(detailPath, 'utf8');

  assert(
    content.includes('data-fallback'),
    'BlogDetailClient.js must have data-fallback check'
  );

  assert(
    content.includes("e.currentTarget.src = '/logo.jpg'"),
    'BlogDetailClient.js must fall back to /logo.jpg on image load error'
  );

  assert(
    content.includes('bg-gray-100'),
    'BlogDetailClient.js image wrapper must include a neutral background placeholder class'
  );
});

test('Blog asset public/uploads/ai-ecommerce-stack-2027.png exists locally with valid PNG magic bytes', () => {
  const assetPath = path.resolve(process.cwd(), 'public/uploads/ai-ecommerce-stack-2027.png');
  assert(fs.existsSync(assetPath), 'Asset public/uploads/ai-ecommerce-stack-2027.png must exist');

  const buf = fs.readFileSync(assetPath);
  assert(buf.length > 100000, `Asset size should be substantial (actual: ${buf.length} bytes)`);

  const magic = buf.subarray(0, 8).toString('hex');
  assert.equal(magic, '89504e470d0a1a0a', 'File must have valid PNG magic number header');
});
