"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const allure_playwright_1 = require("allure-playwright");
test_1.test.describe('JSONPlaceholder - Listing resources', () => {
    allure_playwright_1.allure.description('Validates successful login');
    allure_playwright_1.allure.severity('critical');
    const API_BASE_URL = 'http://jsonplaceholder.typicode.com';
    (0, test_1.test)('GET /posts - should list all posts successfully', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/posts`);
        (0, test_1.expect)(response.status()).toBe(200);
        (0, test_1.expect)(response.ok()).toBe(true);
        (0, test_1.expect)(response.headers()['content-type']).toContain('application/json');
        const posts = (await response.json());
        (0, test_1.expect)(Array.isArray(posts)).toBe(true);
        (0, test_1.expect)(posts.length).toBe(100);
        const firstPost = posts[0];
        (0, test_1.expect)(firstPost).toBeDefined();
        (0, test_1.expect)(firstPost?.id).toBe(1);
        (0, test_1.expect)(firstPost?.title).toBeTruthy();
        (0, test_1.expect)(firstPost?.body).toBeTruthy();
        console.log('Listed posts:', JSON.stringify(posts.slice(0, 3), null, 2));
    });
});
//# sourceMappingURL=listresource.spec.js.map