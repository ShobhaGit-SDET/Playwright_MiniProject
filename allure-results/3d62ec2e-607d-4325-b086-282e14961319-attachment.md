# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: OrangeHRM.spec.ts >> OrangeHRM Login - Data Driven POM >> positive-valid-admin
- Location: tests\OrangeHRM.spec.ts:15:9

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/web/index.php/auth/login", waiting until "load"

```

# Test source

```ts
  1  | import { expect, Locator, Page } from '@playwright/test';
  2  | 
  3  | export class OrangeHRMLoginPage {
  4  |   readonly page: Page;
  5  |   readonly usernameInput: Locator;
  6  |   readonly passwordInput: Locator;
  7  |   readonly loginButton: Locator;
  8  |   readonly errorMessage: Locator;
  9  |   readonly fieldErrorMessages: Locator;
  10 |   readonly loginForm: Locator;
  11 | 
  12 |   static readonly loginPath = '/web/index.php/auth/login';
  13 | 
  14 |   constructor(page: Page) {
  15 |     this.page = page;
  16 |     this.usernameInput = page.locator('input[name="username"]');
  17 |     this.passwordInput = page.locator('input[name="password"]');
  18 |     this.loginButton = page.locator('button[type="submit"]');
  19 |     this.errorMessage = page.locator('.oxd-alert-content-text');
  20 |     this.fieldErrorMessages = page.locator('.oxd-input-field-error-message');
  21 |     this.loginForm = page.locator('div.orangehrm-login-form');
  22 |   }
  23 | 
  24 |   async goto(): Promise<void> {
> 25 |     await this.page.goto(OrangeHRMLoginPage.loginPath);
     |                     ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  26 |     await expect(this.loginForm).toBeVisible({ timeout: 10000 });
  27 |     await expect(this.usernameInput).toBeVisible();
  28 |     await expect(this.passwordInput).toBeVisible();
  29 |     await expect(this.loginButton).toBeEnabled();
  30 |   }
  31 | 
  32 |   async login(username: string, password: string): Promise<void> {
  33 |     await this.usernameInput.fill(username);
  34 |     await this.passwordInput.fill(password);
  35 |     await this.loginButton.click();
  36 |   }
  37 | 
  38 |   async assertLoginError(expectedMessage: string): Promise<void> {
  39 |     await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
  40 |     await expect(this.errorMessage).toHaveText(expectedMessage);
  41 |   }
  42 | 
  43 |   async assertRequiredFieldErrors(expectedCount: number): Promise<void> {
  44 |     await expect(this.fieldErrorMessages).toHaveCount(expectedCount, { timeout: 10000 });
  45 |     await expect(this.fieldErrorMessages).toHaveText(Array(expectedCount).fill('Required'));
  46 |   }
  47 | }
  48 | 
```