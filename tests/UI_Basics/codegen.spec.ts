import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).click();
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill('indian history');
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).press('Enter');
  await expect(page.getByRole('heading', { name: 'History of India' })).toBeVisible();
  await page.getByRole('link', { name: 'Wikipedia The Free' }).click();
  await page.goto('https://www.wikipedia.org/');
});