import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { OrangeHRMLoginPage } from './pages/OrangeHRMLoginPage';
import { OrangeHRMDashboardPage } from './pages/OrangeHRMDashboardPage';
import { loginData } from './testdata/OrangeHRMLoginData';

const baseURL = process.env.ORANGEHRM_URL || 'https://opensource-demo.orangehrmlive.com';
test.setTimeout(60000);

test.describe('OrangeHRM Login - Data Driven POM', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  for (const data of loginData) {
    test(data.id, async ({ page }, testInfo) => {
       allure.description(data.description);
      allure.severity(data.positive ? 'critical' : 'minor');
      allure.label('feature', 'OrangeHRM Login');
      allure.label('epic', 'Data driven login tests');

      const loginPage = new OrangeHRMLoginPage(page);
      const dashboardPage = new OrangeHRMDashboardPage(page);

      await loginPage.goto();
      await loginPage.login(data.username, data.password);

      if (data.positive) {
        await dashboardPage.assertDashboardVisible();
        await expect(page).toHaveTitle(/OrangeHRM/, { timeout: 20000 });
        const screenshot = await page.screenshot({ fullPage: true });
        allure.attachment('Dashboard screenshot', screenshot, 'image/png');
      } else {
        if (data.expectedError) {
          await loginPage.assertLoginError(data.expectedError);
        }

        if (data.expectedRequiredCount) {
          await loginPage.assertRequiredFieldErrors(data.expectedRequiredCount);
        }

        const screenshot = await page.screenshot({ fullPage: true });
           allure.attachment('Login error screenshot', screenshot, 'image/png');
      }

      await expect(page.screenshot()).resolves.toBeInstanceOf(Buffer);
    });
  }
});
