import { test, expect } from '@playwright/test';

test('add and complete habit offline', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('New habit…').fill('Hydrate');
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.getByText('Hydrate')).toBeVisible();

  // Simulate offline
  await page.context().setOffline(true);
  await page.getByRole('button', { name: '✓' }).first().click();
  await page.context().setOffline(false);

  // Still visible after reload due to IndexedDB
  await page.reload();
  await expect(page.getByText('Hydrate')).toBeVisible();
});
