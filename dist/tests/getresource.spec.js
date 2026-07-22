"use strict";
/**
 * API Test - Get Single Post Resource
 * Tests fetching a post from JSONPlaceholder API
 */
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('JSONPlaceholder - Posts Resource', () => {
    const API_BASE_URL = 'http://jsonplaceholder.typicode.com';
    const POST_ID = 1;
    (0, test_1.test)('GET /posts/:id - should fetch a single post successfully', async ({ request }) => {
        // Fetch the post from the API
        const response = await request.get(`${API_BASE_URL}/posts/${POST_ID}`);
        // Verify the response status
        (0, test_1.expect)(response.status()).toBe(200);
        (0, test_1.expect)(response.ok()).toBe(true);
        // Parse the response JSON
        const post = await response.json();
        // Verify the post structure
        (0, test_1.expect)(post).toHaveProperty('userId');
        (0, test_1.expect)(post).toHaveProperty('id');
        (0, test_1.expect)(post).toHaveProperty('title');
        (0, test_1.expect)(post).toHaveProperty('body');
        // Verify the content
        (0, test_1.expect)(post.id).toBe(POST_ID);
        (0, test_1.expect)(post.userId).toBe(1);
        (0, test_1.expect)(typeof post.title).toBe('string');
        (0, test_1.expect)(typeof post.body).toBe('string');
        (0, test_1.expect)(post.title.length).toBeGreaterThan(0);
        (0, test_1.expect)(post.body.length).toBeGreaterThan(0);
        console.log('✓ Post fetched successfully:', post);
    });
    (0, test_1.test)('GET /posts/:id - should handle non-existent post', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/posts/99999`);
        // JSONPlaceholder returns 200 with empty object for non-existent IDs
        (0, test_1.expect)(response.status()).toBe(200);
        const post = await response.json();
        console.log('Response for non-existent post:', post);
    });
    (0, test_1.test)('GET /posts/:id - should validate response headers', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/posts/${POST_ID}`);
        // Verify content type
        (0, test_1.expect)(response.headers()['content-type']).toContain('application/json');
    });
    (0, test_1.test)('GET /posts/:id - should fetch multiple posts', async ({ request }) => {
        const postIds = [1, 2, 3];
        for (const id of postIds) {
            const response = await request.get(`${API_BASE_URL}/posts/${id}`);
            (0, test_1.expect)(response.status()).toBe(200);
            const post = await response.json();
            (0, test_1.expect)(post.id).toBe(id);
            (0, test_1.expect)(post).toHaveProperty('title');
            (0, test_1.expect)(post).toHaveProperty('body');
        }
        console.log('✓ All posts fetched successfully');
    });
    (0, test_1.test)('GET /posts?userId=1 - should fetch posts filtered by userId', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/posts?userId=1`);
        (0, test_1.expect)(response.status()).toBe(200);
        const posts = await response.json();
        (0, test_1.expect)(Array.isArray(posts)).toBe(true);
        (0, test_1.expect)(posts.length).toBeGreaterThan(0);
        // Verify all posts belong to user 1
        posts.forEach((post) => {
            (0, test_1.expect)(post.userId).toBe(1);
        });
        console.log(`✓ Found ${posts.length} posts for userId=1`);
    });
    (0, test_1.test)('GET /posts - should fetch all posts', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/posts`);
        (0, test_1.expect)(response.status()).toBe(200);
        const posts = await response.json();
        (0, test_1.expect)(Array.isArray(posts)).toBe(true);
        (0, test_1.expect)(posts.length).toBe(100); // JSONPlaceholder has 100 posts
        // Verify structure of first post
        const firstPost = posts[0];
        (0, test_1.expect)(firstPost).toHaveProperty('userId');
        (0, test_1.expect)(firstPost).toHaveProperty('id');
        (0, test_1.expect)(firstPost).toHaveProperty('title');
        (0, test_1.expect)(firstPost).toHaveProperty('body');
        console.log(`✓ Fetched all ${posts.length} posts`);
    });
});
test_1.test.describe('JSONPlaceholder - Advanced Post Tests', () => {
    const API_BASE_URL = 'http://jsonplaceholder.typicode.com';
    (0, test_1.test)('should fetch and validate post with TypeScript types', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/posts/1`);
        (0, test_1.expect)(response.status()).toBe(200);
        const post = await response.json();
        // Type-safe assertions
        (0, test_1.expect)(post.id).toBe(1);
        (0, test_1.expect)(post.userId).toBeGreaterThan(0);
        (0, test_1.expect)(post.title).toBeTruthy();
        (0, test_1.expect)(post.body).toBeTruthy();
        console.log('✓ TypeScript-based test passed');
        console.log('Post Data:');
        console.log(`  ID: ${post.id}`);
        console.log(`  User ID: ${post.userId}`);
        console.log(`  Title: ${post.title}`);
        console.log(`  Body: ${post.body.substring(0, 50)}...`);
    });
    (0, test_1.test)('should measure response time', async ({ request }) => {
        const startTime = Date.now();
        const response = await request.get(`${API_BASE_URL}/posts/1`);
        const post = await response.json();
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        console.log(`✓ Response received in ${responseTime}ms`);
        (0, test_1.expect)(responseTime).toBeLessThan(5000); // Should be less than 5 seconds
        (0, test_1.expect)(response.status()).toBe(200);
    });
    (0, test_1.test)('should compare multiple posts', async ({ request }) => {
        const posts = [];
        // Fetch first 3 posts
        for (let i = 1; i <= 3; i++) {
            const response = await request.get(`${API_BASE_URL}/posts/${i}`);
            const post = await response.json();
            posts.push(post);
        }
        (0, test_1.expect)(posts.length).toBe(3);
        // All should have sequential IDs
        posts.forEach((post, index) => {
            (0, test_1.expect)(post.id).toBe(index + 1);
        });
        // All should have same userId (first 3 posts are by user 1)
        posts.forEach((post) => {
            (0, test_1.expect)(post.userId).toBe(1);
        });
        console.log('✓ All post comparisons passed');
    });
});
//# sourceMappingURL=getresource.spec.js.map