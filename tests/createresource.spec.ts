import { test, expect } from '@playwright/test';

interface CreatePostPayload {
  title: string;
  body: string;
  userId: number;
}

interface CreatedPostResponse extends CreatePostPayload {
  id: number;
}

test.describe('JSONPlaceholder - Create resource', () => {
  const API_BASE_URL = 'http://jsonplaceholder.typicode.com';

  test('POST /posts - should create a new post successfully', async ({ request }) => {
    const payload: CreatePostPayload = {
      title: 'foo1',
      body: 'bar1',
      userId: 2,
    };

    const response = await request.post(`${API_BASE_URL}/posts`, {
      data: payload,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    expect(response.status()).toBe(201);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('application/json');

    const createdPost = (await response.json()) as CreatedPostResponse;

    expect(createdPost).toMatchObject({
      id: 101,
      title: 'foo1',
      body: 'bar1',
      userId: 2,
    });

    console.log('Created post:', JSON.stringify(createdPost, null, 2));
  });
});
