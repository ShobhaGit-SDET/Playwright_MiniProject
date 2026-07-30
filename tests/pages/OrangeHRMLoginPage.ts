import { expect, Locator, Page } from '@playwright/test';

export class OrangeHRMLoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly fieldErrorMessages: Locator;
  readonly loginForm: Locator;

  //static readonly loginPath = '/web/index.php/auth/login';

  static readonly baseURL = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com';

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.fieldErrorMessages = page.locator('.oxd-input-field-error-message');
    this.loginForm = page.locator('div.orangehrm-login-form');
  }

  async goto(): Promise<void> {
    const loginUrl = new URL('/web/index.php/auth/login', OrangeHRMLoginPage.baseURL).toString();
    await this.page.goto(loginUrl, { waitUntil: 'networkidle' });
    await expect(this.loginForm).toBeVisible({ timeout: 20000 });
    await expect(this.usernameInput).toBeVisible({ timeout: 20000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 20000 });
    await expect(this.loginButton).toBeEnabled({ timeout: 20000 });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginError(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
    await expect(this.errorMessage).toHaveText(expectedMessage);
  }

  async assertRequiredFieldErrors(expectedCount: number): Promise<void> {
    await expect(this.fieldErrorMessages).toHaveCount(expectedCount, { timeout: 20000 });
    const count = await this.fieldErrorMessages.count();
    for (let i = 0; i < count; i++) {
      await expect(this.fieldErrorMessages.nth(i)).toBeVisible({ timeout: 20000 });
      await expect(this.fieldErrorMessages.nth(i)).not.toHaveText('', { timeout: 20000 });
    }
  }
}
