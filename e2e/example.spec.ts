import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to be" a substring of the page title
  await expect(page).toHaveTitle(/Create Next App/);
});
