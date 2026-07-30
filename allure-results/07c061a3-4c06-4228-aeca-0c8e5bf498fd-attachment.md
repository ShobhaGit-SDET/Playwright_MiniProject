# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: OrangeHRM.spec.ts >> OrangeHRM Login - Data Driven POM >> negative-empty-credentials
- Location: tests\OrangeHRM.spec.ts:15:9

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/web/index.php/auth/login", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e6]:
    - img "company-branding" [ref=e8]
    - generic [ref=e9]:
      - heading "Login" [level=5] [ref=e10]
      - generic [ref=e11]:
        - generic [ref=e13]:
          - paragraph [ref=e14]: "Username : Admin"
          - paragraph [ref=e15]: "Password : admin123"
        - generic [ref=e16]:
          - generic [ref=e18]:
            - generic [ref=e19]:
              - generic [ref=e20]: 
              - generic [ref=e21]: Username
            - textbox "Username" [active] [ref=e23]
          - generic [ref=e25]:
            - generic [ref=e26]:
              - generic [ref=e27]: 
              - generic [ref=e28]: Password
            - textbox "Password" [ref=e30]
          - button "Login" [ref=e32] [cursor=pointer]
          - paragraph [ref=e34] [cursor=pointer]: Forgot your password?
      - generic [ref=e35]:
        - generic [ref=e36]:
          - link [ref=e37] [cursor=pointer]:
            - /url: https://www.linkedin.com/company/orangehrm/mycompany/
          - link [ref=e40] [cursor=pointer]:
            - /url: https://www.facebook.com/OrangeHRM/
          - link [ref=e43] [cursor=pointer]:
            - /url: https://twitter.com/orangehrm?lang=en
          - link [ref=e46] [cursor=pointer]:
            - /url: https://www.youtube.com/c/OrangeHRMInc
        - generic [ref=e49]:
          - paragraph [ref=e50]: OrangeHRM OS 5.9
          - paragraph [ref=e51]:
            - text: © 2005 - 2026
            - link "OrangeHRM, Inc" [ref=e52] [cursor=pointer]:
              - /url: http://www.orangehrm.com
            - text: . All rights reserved.
  - img "orangehrm-logo" [ref=e54]
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