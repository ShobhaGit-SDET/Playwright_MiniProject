"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('JSONPlaceholder - Create resource', () => {
    const API_BASE_URL = 'http://jsonplaceholder.typicode.com';
    (0, test_1.test)('POST /posts - should create a new post successfully', async ({ request }) => {
        const payload = {
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
        (0, test_1.expect)(response.status()).toBe(201);
        (0, test_1.expect)(response.ok()).toBe(true);
        (0, test_1.expect)(response.headers()['content-type']).toContain('application/json');
        const createdPost = (await response.json());
        (0, test_1.expect)(createdPost).toMatchObject({
            id: 101,
            title: 'foo1',
            body: 'bar1',
            userId: 2,
        });
        console.log('Created post:', JSON.stringify(createdPost, null, 2));
    });
});
//# sourceMappingURL=createresource.spec.js.map