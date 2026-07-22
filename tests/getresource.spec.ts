/**
 * API Test - Get Single Post Resource
 * Tests fetching a post from JSONPlaceholder API
 */

import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder - Posts Resource', () => {
  const API_BASE_URL = 'http://jsonplaceholder.typicode.com';
  const POST_ID = 1;

  test('GET /posts/:id - should fetch a single post successfully', async ({ request }) => {
    // Fetch the post from the API
    const response = await request.get(`${API_BASE_URL}/posts/${POST_ID}`);

    // Verify the response status
    expect(response.status()).toBe(200);
    expect(response.ok()).toBe(true);

    // Parse the response JSON
    const post = await response.json();

    // Verify the post structure
    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');

    // Verify the content
    expect(post.id).toBe(POST_ID);
    expect(post.userId).toBe(1);
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
    expect(post.title.length).toBeGreaterThan(0);
    expect(post.body.length).toBeGreaterThan(0);

    console.log('✓ Post fetched successfully:', post);
  });

  test('GET /posts/:id - should handle non-existent post', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/posts/99999`);

    // JSONPlaceholder returns 200 with empty object for non-existent IDs
    expect(response.status()).toBe(200);

    const post = await response.json();
    console.log('Response for non-existent post:', post);
  });

  test('GET /posts/:id - should validate response headers', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/posts/${POST_ID}`);

    // Verify content type
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('GET /posts/:id - should fetch multiple posts', async ({ request }) => {
    const postIds = [1, 2, 3];
    
    for (const id of postIds) {
      const response = await request.get(`${API_BASE_URL}/posts/${id}`);
      expect(response.status()).toBe(200);

      const post = await response.json();
      expect(post.id).toBe(id);
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('body');
    }

    console.log('✓ All posts fetched successfully');
  });

  test('GET /posts?userId=1 - should fetch posts filtered by userId', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/posts?userId=1`);

    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);

    // Verify all posts belong to user 1
    posts.forEach((post: any) => {
      expect(post.userId).toBe(1);
    });

    console.log(`✓ Found ${posts.length} posts for userId=1`);
  });

  test('GET /posts - should fetch all posts', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/posts`);

    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBe(100); // JSONPlaceholder has 100 posts

    // Verify structure of first post
    const firstPost = posts[0];
    expect(firstPost).toHaveProperty('userId');
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');

    console.log(`✓ Fetched all ${posts.length} posts`);
  });
});

// Advanced test using async/await with proper typing
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

test.describe('JSONPlaceholder - Advanced Post Tests', () => {
  const API_BASE_URL = 'http://jsonplaceholder.typicode.com';

  test('should fetch and validate post with TypeScript types', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/posts/1`);

    expect(response.status()).toBe(200);

    const post: Post = await response.json();

    // Type-safe assertions
    expect(post.id).toBe(1);
    expect(post.userId).toBeGreaterThan(0);
    expect(post.title).toBeTruthy();
    expect(post.body).toBeTruthy();

    console.log('✓ TypeScript-based test passed');
    console.log('Post Data:');
    console.log(`  ID: ${post.id}`);
    console.log(`  User ID: ${post.userId}`);
    console.log(`  Title: ${post.title}`);
    console.log(`  Body: ${post.body.substring(0, 50)}...`);
  });

  test('should measure response time', async ({ request }) => {
    const startTime = Date.now();
    
    const response = await request.get(`${API_BASE_URL}/posts/1`);
    const post: Post = await response.json();

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    console.log(`✓ Response received in ${responseTime}ms`);
    expect(responseTime).toBeLessThan(5000); // Should be less than 5 seconds
    expect(response.status()).toBe(200);
  });

  test('should compare multiple posts', async ({ request }) => {
    const posts: Post[] = [];

    // Fetch first 3 posts
    for (let i = 1; i <= 3; i++) {
      const response = await request.get(`${API_BASE_URL}/posts/${i}`);
      const post: Post = await response.json();
      posts.push(post);
    }

    expect(posts.length).toBe(3);

    // All should have sequential IDs
    posts.forEach((post, index) => {
      expect(post.id).toBe(index + 1);
    });

    // All should have same userId (first 3 posts are by user 1)
    posts.forEach((post) => {
      expect(post.userId).toBe(1);
    });

    console.log('✓ All post comparisons passed');
   });
 });
