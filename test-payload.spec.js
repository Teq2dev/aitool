const { test, expect } = require('@playwright/test');

test('repeatable fields add inputs correctly and payload is correct', async ({ page }) => {
  await page.goto('http://localhost:3001/submit');

  async function testRepeatableField(label, values) {
    const newLocator = page.locator(`input[aria-label="New ${label}"]`);
    const addButton = page.locator(`button[aria-label="Add ${label}"]`);
    
    for (const val of values) {
      await newLocator.fill(val);
      await addButton.click();
    }
  }

  await testRepeatableField('pro', ['Pro 1', 'Pro 2']);
  await testRepeatableField('con', ['Con 1']);
  await testRepeatableField('feature', ['Feat 1']);
  await testRepeatableField('tag', ['Tag 1', 'Tag 2']);

  // Fill in required basic info
  await page.locator('input[placeholder="e.g. ChatGPT"]').fill('Test Tool');
  await page.locator('input[placeholder="https://example.com"]').fill('https://example.com/test');
  // Upload logic requires file, let's use favicon
  await page.getByRole('tab', { name: 'Auto-fetch Favicon' }).click();
  await page.getByRole('button', { name: 'Fetch Favicon' }).click();
  
  await page.locator('input[placeholder="One-line summary of what the tool does"]').fill('Short desc');
  
  // Set category
  await page.locator('.flex.flex-wrap.gap-2.max-h-52 button').first().click({ timeout: 60000 });

  // Set up request interceptor
  const requestPromise = page.waitForRequest(request => 
    request.url().includes('/api/tools') && request.method() === 'POST'
  );

  await page.getByRole('button', { name: 'Submit Tool for Review' }).click();

  const request = await requestPromise;
  const postData = JSON.parse(request.postData());
  
  expect(postData.pros).toEqual(['Pro 1', 'Pro 2']);
  expect(postData.cons).toEqual(['Con 1']);
  expect(postData.features).toEqual(['Feat 1']);
  expect(postData.tags).toEqual(['Tag 1', 'Tag 2']);
});
