import {test,expect} from '@playwright/test';

import { allure } from 'allure-playwright';

test('Login to Sauce Demo', async ({ page }) => {

    allure.description('Validates successful login');
allure.severity('critical');
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
allure.attachment('Dashboard Screenshot', screenshot, 'image/png');
    
    // Verify successful login by checking for the products page
    await expect(page).toHaveTitle(/Swag Labs/);
    
    // Verify that we're on the inventory page
    const pageTitle = await page.locator('.title');
    await expect(pageTitle).toContainText('Products');


   
});