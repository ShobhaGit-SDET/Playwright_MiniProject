import { test } from '@playwright/test';

test('fixture1', async ({ page }) => {
    console.log('This is fixture1');
    await page.goto('https://jsonplaceholder.typicode.com');
});


test('fixture2', async ({ page }) => {
    console.log('This is fixture2');
    await page.goto('https://postman-echo.com');
});

