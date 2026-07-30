import {test, expect} from '@playwright/test';

test('UI Basics', async ({page}) => {

    const url = 'https://www.wikipedia.org/';

    await page.goto(url);

      //await page.waitForTimeout(5000);

    await expect(page).toHaveTitle(/Wikipedia/);

});