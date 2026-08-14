const { test, expect } = require('@playwright/test');

test('repeatable fields add inputs correctly', async ({ page }) => {
  await page.goto('http://localhost:3001/submit');

  async function testRepeatableField(label) {
    const newLocator = page.locator(`input[aria-label="New ${label}"]`);
    const addButton = page.locator(`button[aria-label="Add ${label}"]`);
    
    // Initial state: 0 items
    let inputs = await page.locator(`input[aria-label^="${label} "]`).count();
    expect(inputs).toBe(0);

    // Type in new input and click add
    await newLocator.fill(`First ${label}`);
    await addButton.click();

    // Now there should be 1 item input
    inputs = await page.locator(`input[aria-label^="${label} "]`).count();
    expect(inputs).toBe(1);

    // Type in new input and click add again
    await newLocator.fill(`Second ${label}`);
    await addButton.click();

    // Now there should be 2 item inputs
    inputs = await page.locator(`input[aria-label^="${label} "]`).count();
    expect(inputs).toBe(2);

    // Check values
    const val1 = await page.locator(`input[aria-label="${label} 1"]`).inputValue();
    const val2 = await page.locator(`input[aria-label="${label} 2"]`).inputValue();
    expect(val1).toBe(`First ${label}`);
    expect(val2).toBe(`Second ${label}`);
  }

  await testRepeatableField('pro');
  await testRepeatableField('con');
  await testRepeatableField('feature');
  await testRepeatableField('tag');
});
