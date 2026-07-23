"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const allure_playwright_1 = require("allure-playwright");
(0, test_1.test)('Login to Sauce Demo', async ({ page }) => {
    allure_playwright_1.allure.description('Validates successful login');
    allure_playwright_1.allure.severity('critical');
    // Navigate to the login page
    await page.goto("https://saucedemo.com/v1/index.html");
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    // Enter username
    await page.fill('input[placeholder="Username"]', 'standard_user');
    // Enter password
    await page.fill('input[placeholder="Password"]', 'secret_sauce');
    // Click login button
    await page.click('input[type="submit"]');
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');
    const screenshot = await page.screenshot();
    allure_playwright_1.allure.attachment('Dashboard Screenshot', screenshot, 'image/png');
    // Verify successful login by checking for the products page
    await (0, test_1.expect)(page).toHaveTitle(/Swag Labs/);
    // Verify that we're on the inventory page
    const pageTitle = await page.locator('.title');
    await (0, test_1.expect)(pageTitle).toContainText('Products');
});
//# sourceMappingURL=sampletest.spec.js.map