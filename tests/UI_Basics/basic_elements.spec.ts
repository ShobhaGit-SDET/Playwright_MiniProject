import{test,expect}from'@playwright/test';


test('basic elements',async({page})=>{
    
    await page.goto('https://dd-demo-tau.vercel.app/web_elements.html');
    await page.waitForTimeout(3000);

    const btnclickMe = page.locator('#clickBtn');
    await btnclickMe.scrollIntoViewIfNeeded();

      await page.waitForTimeout(2000);

    await btnclickMe.click();

   // page.locator('#btnClickMe').click();

   expect(page.locator('div#buttonMsg')).toHaveText('Click Me button clicked'); 
   
   await page.close();

});