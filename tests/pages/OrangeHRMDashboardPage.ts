import { expect, Locator, Page } from '@playwright/test';

export class OrangeHRMDashboardPage {
  readonly page: Page;
  readonly dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeader = page.locator('h6.oxd-text--h6');
  }

  async assertDashboardVisible(): Promise<void> {
    await expect(this.dashboardHeader).toBeVisible({ timeout: 30000 });
    await expect(this.dashboardHeader).toHaveText('Dashboard', { timeout: 30000 });
    await expect(this.page).toHaveURL(/web\/index\.php\/dashboard/, { timeout: 30000 });
  }
}
