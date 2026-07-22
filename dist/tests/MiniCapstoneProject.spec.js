"use strict";
/**
 * Mini Capstone Project - JSONPlaceholder API Tests
 *
 * This test suite demonstrates:
 * - API testing with Playwright
 * - Reusable utilities and helpers
 * - Custom loggers
 * - All hook types (beforeAll, beforeEach, afterAll, afterEach)
 * - Test organization with describe blocks
 * - Skip functionality
 * - Data validation
 * - Error handling
 */
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const apiClient_1 = require("../utils/apiClient");
const logger_1 = require("../utils/logger");
const testHelpers_1 = require("../utils/testHelpers");
test_1.test.describe('JSONPlaceholder API - Mini Capstone Project', () => {
    let testPostId;
    let testUserId;
    // Global setup before all tests
    test_1.test.beforeAll(async () => {
        logger_1.logger.info('=== Starting Mini Capstone Project Test Suite ===');
        logger_1.logger.info('Testing JSONPlaceholder API: /posts and /users resources');
    });
    // Setup before each test
    test_1.test.beforeEach(async () => {
        logger_1.logger.debug('Setting up test environment...');
    });
    // Cleanup after each test
    test_1.test.afterEach(async () => {
        logger_1.logger.debug('Cleaning up after test...');
    });
    // Global cleanup after all tests
    test_1.test.afterAll(async () => {
        logger_1.logger.success('=== Mini Capstone Project Test Suite Completed ===');
    });
    test_1.test.describe('Posts Resource Tests', () => {
        test_1.test.beforeEach(async () => {
            logger_1.logger.info('Preparing posts tests...');
        });
        (0, test_1.test)('GET /posts - should retrieve all posts', async () => {
            logger_1.logger.info('Test: GET /posts - Retrieve all posts');
            const response = await apiClient_1.apiClient.getAllPosts();
            testHelpers_1.AssertionHelper.assertResponseStatus(response.status, 200);
            testHelpers_1.AssertionHelper.assertArrayNotEmpty(response.data);
            (0, test_1.expect)(response.success).toBe(true);
            // Validate first post structure
            testHelpers_1.AssertionHelper.assertPostStructure(response.data[0]);
            logger_1.logger.success(`Retrieved ${response.data.length} posts`);
        });
        (0, test_1.test)('GET /posts/:id - should retrieve post by ID', async () => {
            logger_1.logger.info('Test: GET /posts/:id - Retrieve post by ID');
            testPostId = 1;
            const response = await apiClient_1.apiClient.getPostById(testPostId);
            testHelpers_1.AssertionHelper.assertResponseStatus(response.status, 200);
            testHelpers_1.AssertionHelper.assertPostStructure(response.data);
            (0, test_1.expect)(response.data.id).toBe(testPostId);
            (0, test_1.expect)(testHelpers_1.DataValidator.isPostValid(response.data)).toBe(true);
            logger_1.logger.success(`Post ${testPostId} retrieved successfully`);
        });
        (0, test_1.test)('GET /posts?userId=:id - should retrieve posts by user ID', async () => {
            logger_1.logger.info('Test: GET /posts?userId=:id - Retrieve posts by user ID');
            const userId = 1;
            const response = await apiClient_1.apiClient.getPostsByUserId(userId);
            testHelpers_1.AssertionHelper.assertResponseStatus(response.status, 200);
            testHelpers_1.AssertionHelper.assertArrayNotEmpty(response.data);
            // Verify all posts belong to the user
            response.data.forEach(post => {
                (0, test_1.expect)(post.userId).toBe(userId);
                testHelpers_1.AssertionHelper.assertPostStructure(post);
            });
            logger_1.logger.success(`Retrieved ${response.data.length} posts for user ${userId}`);
        });
        (0, test_1.test)('POST /posts - should create a new post', async () => {
            logger_1.logger.info('Test: POST /posts - Create new post');
            const newPost = testHelpers_1.TestDataHelper.generateMockPost({
                title: 'New Test Post',
                body: 'This is a new test post body',
            });
            const response = await apiClient_1.apiClient.createPost(newPost);
            testHelpers_1.AssertionHelper.assertResponseStatus(response.status, 201);
            (0, test_1.expect)(response.data.title).toBe(newPost.title);
            (0, test_1.expect)(response.data.body).toBe(newPost.body);
            logger_1.logger.success(`Post created with ID: ${response.data.id}`);
        });
        (0, test_1.test)('PUT /posts/:id - should update an existing post', async () => {
            logger_1.logger.info('Test: PUT /posts/:id - Update post');
            const postId = 1;
            const updatedPost = {
                title: 'Updated Post Title',
                body: 'Updated post body',
            };
            const response = await apiClient_1.apiClient.updatePost(postId, updatedPost);
            testHelpers_1.AssertionHelper.assertResponseStatus(response.status, 200);
            (0, test_1.expect)(response.data.title).toBe(updatedPost.title);
            (0, test_1.expect)(response.data.body).toBe(updatedPost.body);
            logger_1.logger.success(`Post ${postId} updated successfully`);
        });
        (0, test_1.test)('DELETE /posts/:id - should delete a post', async () => {
            logger_1.logger.info('Test: DELETE /posts/:id - Delete post');
            const postId = 1;
            const response = await apiClient_1.apiClient.deletePost(postId);
            testHelpers_1.AssertionHelper.assertResponseStatus(response.status, 200);
            logger_1.logger.success(`Post ${postId} deleted successfully`);
        });
        test_1.test.skip('SKIP: Test to demonstrate skip functionality', async () => {
            logger_1.logger.warn('This test is intentionally skipped');
            (0, test_1.expect)(true).toBe(false); // This won't run
        });
    });
    test_1.test.describe('Users Resource Tests', () => {
        test_1.test.beforeEach(async () => {
            logger_1.logger.info('Preparing users tests...');
        });
        (0, test_1.test)('GET /users - should retrieve all users', async () => {
            logger_1.logger.info('Test: GET /users - Retrieve all users');
            const response = await apiClient_1.apiClient.getAllUsers();
            testHelpers_1.AssertionHelper.assertResponseStatus(response.status, 200);
            testHelpers_1.AssertionHelper.assertArrayNotEmpty(response.data);
            (0, test_1.expect)(response.success).toBe(true);
            // Validate first user structure
            testHelpers_1.AssertionHelper.assertUserStructure(response.data[0]);
            logger_1.logger.success(`Retrieved ${response.data.length} users`);
        });
        (0, test_1.test)('GET /users/:id - should retrieve user by ID', async () => {
            logger_1.logger.info('Test: GET /users/:id - Retrieve user by ID');
            testUserId = 1;
            const response = await apiClient_1.apiClient.getUserById(testUserId);
            testHelpers_1.AssertionHelper.assertResponseStatus(response.status, 200);
            testHelpers_1.AssertionHelper.assertUserStructure(response.data);
            (0, test_1.expect)(response.data.id).toBe(testUserId);
            (0, test_1.expect)(testHelpers_1.DataValidator.isUserValid(response.data)).toBe(true);
            (0, test_1.expect)(testHelpers_1.DataValidator.isValidEmail(response.data.email)).toBe(true);
            logger_1.logger.success(`User ${testUserId} retrieved successfully`);
        });
        (0, test_1.test)('POST /users - should create a new user', async () => {
            logger_1.logger.info('Test: POST /users - Create new user');
            const newUser = testHelpers_1.TestDataHelper.generateMockUser({
                name: 'New Test User',
                email: 'newuser@test.com',
            });
            const response = await apiClient_1.apiClient.createUser(newUser);
            testHelpers_1.AssertionHelper.assertResponseStatus(response.status, 201);
            (0, test_1.expect)(response.data.name).toBe(newUser.name);
            (0, test_1.expect)(response.data.email).toBe(newUser.email);
            (0, test_1.expect)(testHelpers_1.DataValidator.isValidEmail(response.data.email)).toBe(true);
            logger_1.logger.success(`User created with ID: ${response.data.id}`);
        });
        (0, test_1.test)('PUT /users/:id - should update an existing user', async () => {
            logger_1.logger.info('Test: PUT /users/:id - Update user');
            const userId = 1;
            const updatedUser = {
                name: 'Updated User Name',
                email: 'updated@test.com',
            };
            const response = await apiClient_1.apiClient.updateUser(userId, updatedUser);
            testHelpers_1.AssertionHelper.assertResponseStatus(response.status, 200);
            (0, test_1.expect)(response.data.name).toBe(updatedUser.name);
            (0, test_1.expect)(response.data.email).toBe(updatedUser.email);
            logger_1.logger.success(`User ${userId} updated successfully`);
        });
        (0, test_1.test)('DELETE /users/:id - should delete a user', async () => {
            logger_1.logger.info('Test: DELETE /users/:id - Delete user');
            const userId = 1;
            const response = await apiClient_1.apiClient.deleteUser(userId);
            testHelpers_1.AssertionHelper.assertResponseStatus(response.status, 200);
            logger_1.logger.success(`User ${userId} deleted successfully`);
        });
    });
    test_1.test.describe('Data Validation Tests', () => {
        (0, test_1.test)('should validate email format', async () => {
            logger_1.logger.info('Test: Email validation');
            (0, test_1.expect)(testHelpers_1.DataValidator.isValidEmail('test@example.com')).toBe(true);
            (0, test_1.expect)(testHelpers_1.DataValidator.isValidEmail('invalid-email')).toBe(false);
            logger_1.logger.success('Email validation tests passed');
        });
        (0, test_1.test)('should validate URL format', async () => {
            logger_1.logger.info('Test: URL validation');
            (0, test_1.expect)(testHelpers_1.DataValidator.isValidUrl('https://example.com')).toBe(true);
            (0, test_1.expect)(testHelpers_1.DataValidator.isValidUrl('not a url')).toBe(false);
            logger_1.logger.success('URL validation tests passed');
        });
        (0, test_1.test)('should validate post structure', async () => {
            logger_1.logger.info('Test: Post structure validation');
            const response = await apiClient_1.apiClient.getPostById(1);
            (0, test_1.expect)(testHelpers_1.DataValidator.isPostValid(response.data)).toBe(true);
            logger_1.logger.success('Post validation test passed');
        });
        (0, test_1.test)('should validate user structure', async () => {
            logger_1.logger.info('Test: User structure validation');
            const response = await apiClient_1.apiClient.getUserById(1);
            (0, test_1.expect)(testHelpers_1.DataValidator.isUserValid(response.data)).toBe(true);
            logger_1.logger.success('User validation test passed');
        });
    });
    test_1.test.describe('Error Handling Tests', () => {
        (0, test_1.test)('should handle non-existent post gracefully', async () => {
            logger_1.logger.info('Test: Handle non-existent post');
            const response = await apiClient_1.apiClient.getPostById(999999);
            // JSONPlaceholder returns empty object for non-existent IDs
            (0, test_1.expect)(response.status).toBe(200);
            logger_1.logger.info('Non-existent post handling test passed');
        });
        (0, test_1.test)('should handle non-existent user gracefully', async () => {
            logger_1.logger.info('Test: Handle non-existent user');
            const response = await apiClient_1.apiClient.getUserById(999999);
            // JSONPlaceholder returns empty object for non-existent IDs
            (0, test_1.expect)(response.status).toBe(200);
            logger_1.logger.info('Non-existent user handling test passed');
        });
    });
});
//# sourceMappingURL=MiniCapstoneProject.spec.js.map