import { test, expect } from '@playwright/test';

import * as allure from 'allure-js-commons';

interface PostResource {
  userId: number;
  id: number;
  title: string;
  body: string;
}

test.describe('JSONPlaceholder - Listing resources', () => {

   allure.description('Validates successful login');
allure.severity('critical');
  const API_BASE_URL = 'http://jsonplaceholder.typicode.com';

  test('GET /posts - should list all posts successfully', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/posts`);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('application/json');

    const posts = (await response.json()) as PostResource[];

    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBe(100);

    const firstPost = posts[0];
    expect(firstPost).toBeDefined();
    expect(firstPost?.id).toBe(1);
    expect(firstPost?.title).toBeTruthy();
    expect(firstPost?.body).toBeTruthy();

    console.log('Listed posts:', JSON.stringify(posts.slice(0, 3), null, 2));
   
     
  });
});
