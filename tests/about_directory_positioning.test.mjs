import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('About page communicates dual positioning: Free AI Utility Tools Platform + Curated Directory', () => {
  const pagePath = path.resolve(process.cwd(), 'app/about/page.js');
  const content = fs.readFileSync(pagePath, 'utf8');

  // 1. Dual positioning (free online AI tools platform + directory)
  assert(
    content.includes('free online AI tools platform and comprehensive directory'),
    'Must state that BestAIToolsFree is a free online AI tools platform and comprehensive directory'
  );
  assert(
    content.includes('AI JPG to Excel'),
    'Must mention AI JPG to Excel tool prominently'
  );
  assert(
    content.includes('1,400+'),
    'Must mention 1,400+ curated tools'
  );

  // 2. Mission encompasses both pillars
  assert(
    content.includes('Free Practical AI Utilities:'),
    'Must have Free Practical AI Utilities mission pillar'
  );
  assert(
    content.includes('Intelligent AI Discovery:'),
    'Must have Intelligent AI Discovery mission pillar'
  );

  // 3. Meet Our Founder exact text & details
  assert(content.includes('Meet Our Founder'), 'Must contain "Meet Our Founder" heading');
  assert(content.includes('Dheeraj Parwal'), 'Must contain founder name');
  assert(content.includes('Founder & CEO'), 'Must contain Founder & CEO');
  assert(content.includes('Dheeraj Parwal is an entrepreneur with over 10 years of experience in UI/UX design and digital product development.'), 'Must contain founder background');
  assert(content.includes('Structure:</strong> Sole Proprietorship'), 'Must state Sole Proprietorship structure');
  assert(content.includes('Registration:</strong> Udyam / MSME'), 'Must state Udyam / MSME registration');
  assert(content.includes('Location:</strong> Indore, Madhya Pradesh, India'), 'Must state Indore, Madhya Pradesh, India location');
  assert(content.includes('https://www.linkedin.com/in/dparwal/'), 'Must link to LinkedIn profile');
  assert(content.includes('src="/dheeraj-parwal.jpg"'), 'Must render founder photograph');

  // 4. What We Offer Cards
  assert(content.includes('Free Online AI & Utility Tools'), 'Must include Free Online AI & Utility Tools card');
  assert(content.includes('Curated AI Tools Directory'), 'Must include Curated AI Tools Directory card');
  assert(content.includes('Transparent Pricing Insights'), 'Must include Transparent Pricing Insights card');
  assert(content.includes('Multilingual Global Reach'), 'Must include Multilingual Global Reach card');

  // 5. JSON-LD Schema
  assert(content.includes('@type\': \'AboutPage\'') || content.includes('"@type": "AboutPage"'), 'Must have AboutPage schema');
  assert(content.includes('Dheeraj Parwal'), 'Must have founder in schema');
  assert(content.includes('https://www.linkedin.com/in/dparwal/'), 'Must have sameAs in schema');
});
