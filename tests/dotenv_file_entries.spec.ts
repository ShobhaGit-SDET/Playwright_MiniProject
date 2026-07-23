import {test,expect} from '@playwright/test';

test('Test name',async ({request}) => {

    const baseurl= process.env.BASE_URL;

    const url = `${baseurl}/posts/12`;

    const response = await request.get(url);

    expect(response.status()).toBe(200);    
    const jsonData = await response.json();
    console.log('Response data:', jsonData);

});