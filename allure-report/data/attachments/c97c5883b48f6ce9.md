# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: OrangeHRM.spec.ts >> OrangeHRM Login - Data Driven POM >> negative-empty-credentials
- Location: tests\OrangeHRM.spec.ts:14:9

# Error details

```
Error: page.goto: url: expected string, got undefined
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { allure } from 'allure-playwright';
  3  | import { OrangeHRMLoginPage } from './pages/OrangeHRMLoginPage';
  4  | import { OrangeHRMDashboardPage } from './pages/OrangeHRMDashboardPage';
  5  | import { loginData } from './testdata/OrangeHRMLoginData';
  6  | 
  7  | 
  8  | test.describe('OrangeHRM Login - Data Driven POM', () => {
  9  |   test.beforeEach(async ({ page }) => {
> 10 |     await page.goto(process.env.baseURL!);
     |                ^ Error: page.goto: url: expected string, got undefined
  11 |   });
  12 | 
  13 |   for (const data of loginData) {
  14 |     test(data.id, async ({ page }, testInfo) => {
  15 |       allure.description(data.description);
  16 |       allure.severity(data.positive ? 'critical' : 'minor');
  17 |       allure.label('feature', 'OrangeHRM Login');
  18 |       allure.label('epic', 'Data driven login tests');
  19 | 
  20 |       const loginPage = new OrangeHRMLoginPage(page);
  21 |       const dashboardPage = new OrangeHRMDashboardPage(page);
  22 | 
  23 |       await loginPage.goto();
  24 |       await loginPage.login(data.username, data.password);
  25 | 
  26 |       if (data.positive) {
  27 |         await dashboardPage.assertDashboardVisible();
  28 |         const screenshot = await page.screenshot({ fullPage: true });
  29 |         allure.attachment('Dashboard screenshot', screenshot, 'image/png');
  30 |       } else {
  31 |         if (data.expectedError) {
  32 |           await loginPage.assertLoginError(data.expectedError);
  33 |         }
  34 | 
  35 |         if (data.expectedRequiredCount) {
  36 |           await loginPage.assertRequiredFieldErrors(data.expectedRequiredCount);
  37 |         }
  38 | 
  39 |         const screenshot = await page.screenshot({ fullPage: true });
  40 |         allure.attachment('Login error screenshot', screenshot, 'image/png');
  41 |       }
  42 | 
  43 |       await expect(page).toHaveTitle(/OrangeHRM/);
  44 |       await expect(page.screenshot()).resolves.toBeInstanceOf(Buffer);
  45 |     });
  46 |   }
  47 | });
  48 | 
```