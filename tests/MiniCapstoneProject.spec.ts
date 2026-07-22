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

import { test, expect } from '@playwright/test';
import { apiClient, Post, User } from '../utils/apiClient';
import { logger } from '../utils/logger';
import { TestDataHelper, AssertionHelper, DataValidator } from '../utils/testHelpers';

test.describe('JSONPlaceholder API - Mini Capstone Project', () => {
  let testPostId: number;
  let testUserId: number;

  // Global setup before all tests
  test.beforeAll(async () => {
    logger.info('=== Starting Mini Capstone Project Test Suite ===');
    logger.info('Testing JSONPlaceholder API: /posts and /users resources');
  });

  // Setup before each test
  test.beforeEach(async () => {
    logger.debug('Setting up test environment...');
  });

  // Cleanup after each test
  test.afterEach(async () => {
    logger.debug('Cleaning up after test...');
  });

  // Global cleanup after all tests
  test.afterAll(async () => {
    logger.success('=== Mini Capstone Project Test Suite Completed ===');
  });

  test.describe('Posts Resource Tests', () => {
    test.beforeEach(async () => {
      logger.info('Preparing posts tests...');
    });

    test('GET /posts - should retrieve all posts', async () => {
      logger.info('Test: GET /posts - Retrieve all posts');
      
      const response = await apiClient.getAllPosts();
      
      AssertionHelper.assertResponseStatus(response.status, 200);
      AssertionHelper.assertArrayNotEmpty(response.data);
      expect(response.success).toBe(true);
      
      // Validate first post structure
      AssertionHelper.assertPostStructure(response.data[0]);
      logger.success(`Retrieved ${response.data.length} posts`);
    });

    test('GET /posts/:id - should retrieve post by ID', async () => {
      logger.info('Test: GET /posts/:id - Retrieve post by ID');
      
      testPostId = 1;
      const response = await apiClient.getPostById(testPostId);
      
      AssertionHelper.assertResponseStatus(response.status, 200);
      AssertionHelper.assertPostStructure(response.data);
      expect(response.data.id).toBe(testPostId);
      expect(DataValidator.isPostValid(response.data)).toBe(true);
      
      logger.success(`Post ${testPostId} retrieved successfully`);
    });

    test('GET /posts?userId=:id - should retrieve posts by user ID', async () => {
      logger.info('Test: GET /posts?userId=:id - Retrieve posts by user ID');
      
      const userId = 1;
      const response = await apiClient.getPostsByUserId(userId);
      
      AssertionHelper.assertResponseStatus(response.status, 200);
      AssertionHelper.assertArrayNotEmpty(response.data);
      
      // Verify all posts belong to the user
      response.data.forEach(post => {
        expect(post.userId).toBe(userId);
        AssertionHelper.assertPostStructure(post);
      });
      
      logger.success(`Retrieved ${response.data.length} posts for user ${userId}`);
    });

    test('POST /posts - should create a new post', async () => {
      logger.info('Test: POST /posts - Create new post');
      
      const newPost = TestDataHelper.generateMockPost({
        title: 'New Test Post',
        body: 'This is a new test post body',
      });
      
      const response = await apiClient.createPost(newPost);
      
      AssertionHelper.assertResponseStatus(response.status, 201);
      expect(response.data.title).toBe(newPost.title);
      expect(response.data.body).toBe(newPost.body);
      
      logger.success(`Post created with ID: ${response.data.id}`);
    });

    test('PUT /posts/:id - should update an existing post', async () => {
      logger.info('Test: PUT /posts/:id - Update post');
      
      const postId = 1;
      const updatedPost = {
        title: 'Updated Post Title',
        body: 'Updated post body',
      };
      
      const response = await apiClient.updatePost(postId, updatedPost);
      
      AssertionHelper.assertResponseStatus(response.status, 200);
      expect(response.data.title).toBe(updatedPost.title);
      expect(response.data.body).toBe(updatedPost.body);
      
      logger.success(`Post ${postId} updated successfully`);
    });

    test('DELETE /posts/:id - should delete a post', async () => {
      logger.info('Test: DELETE /posts/:id - Delete post');
      
      const postId = 1;
      const response = await apiClient.deletePost(postId);
      
      AssertionHelper.assertResponseStatus(response.status, 200);
      logger.success(`Post ${postId} deleted successfully`);
    });

    test.skip('SKIP: Test to demonstrate skip functionality', async () => {
      logger.warn('This test is intentionally skipped');
      expect(true).toBe(false); // This won't run
    });
  });

  test.describe('Users Resource Tests', () => {
    test.beforeEach(async () => {
      logger.info('Preparing users tests...');
    });

    test('GET /users - should retrieve all users', async () => {
      logger.info('Test: GET /users - Retrieve all users');
      
      const response = await apiClient.getAllUsers();
      
      AssertionHelper.assertResponseStatus(response.status, 200);
      AssertionHelper.assertArrayNotEmpty(response.data);
      expect(response.success).toBe(true);
      
      // Validate first user structure
      AssertionHelper.assertUserStructure(response.data[0]);
      logger.success(`Retrieved ${response.data.length} users`);
    });

    test('GET /users/:id - should retrieve user by ID', async () => {
      logger.info('Test: GET /users/:id - Retrieve user by ID');
      
      testUserId = 1;
      const response = await apiClient.getUserById(testUserId);
      
      AssertionHelper.assertResponseStatus(response.status, 200);
      AssertionHelper.assertUserStructure(response.data);
      expect(response.data.id).toBe(testUserId);
      expect(DataValidator.isUserValid(response.data)).toBe(true);
      expect(DataValidator.isValidEmail(response.data.email)).toBe(true);
      
      logger.success(`User ${testUserId} retrieved successfully`);
    });

    test('POST /users - should create a new user', async () => {
      logger.info('Test: POST /users - Create new user');
      
      const newUser = TestDataHelper.generateMockUser({
        name: 'New Test User',
        email: 'newuser@test.com',
      });
      
      const response = await apiClient.createUser(newUser);
      
      AssertionHelper.assertResponseStatus(response.status, 201);
      expect(response.data.name).toBe(newUser.name);
      expect(response.data.email).toBe(newUser.email);
      expect(DataValidator.isValidEmail(response.data.email)).toBe(true);
      
      logger.success(`User created with ID: ${response.data.id}`);
    });

    test('PUT /users/:id - should update an existing user', async () => {
      logger.info('Test: PUT /users/:id - Update user');
      
      const userId = 1;
      const updatedUser = {
        name: 'Updated User Name',
        email: 'updated@test.com',
      };
      
      const response = await apiClient.updateUser(userId, updatedUser);
      
      AssertionHelper.assertResponseStatus(response.status, 200);
      expect(response.data.name).toBe(updatedUser.name);
      expect(response.data.email).toBe(updatedUser.email);
      
      logger.success(`User ${userId} updated successfully`);
    });

    test('DELETE /users/:id - should delete a user', async () => {
      logger.info('Test: DELETE /users/:id - Delete user');
      
      const userId = 1;
      const response = await apiClient.deleteUser(userId);
      
      AssertionHelper.assertResponseStatus(response.status, 200);
      logger.success(`User ${userId} deleted successfully`);
    });
  });

  test.describe('Data Validation Tests', () => {
    test('should validate email format', async () => {
      logger.info('Test: Email validation');
      
      expect(DataValidator.isValidEmail('test@example.com')).toBe(true);
      expect(DataValidator.isValidEmail('invalid-email')).toBe(false);
      
      logger.success('Email validation tests passed');
    });

    test('should validate URL format', async () => {
      logger.info('Test: URL validation');
      
      expect(DataValidator.isValidUrl('https://example.com')).toBe(true);
      expect(DataValidator.isValidUrl('not a url')).toBe(false);
      
      logger.success('URL validation tests passed');
    });

    test('should validate post structure', async () => {
      logger.info('Test: Post structure validation');
      
      const response = await apiClient.getPostById(1);
      
      expect(DataValidator.isPostValid(response.data)).toBe(true);
      logger.success('Post validation test passed');
    });

    test('should validate user structure', async () => {
      logger.info('Test: User structure validation');
      
      const response = await apiClient.getUserById(1);
      
      expect(DataValidator.isUserValid(response.data)).toBe(true);
      logger.success('User validation test passed');
    });
  });

  test.describe('Error Handling Tests', () => {
    test('should handle non-existent post gracefully', async () => {
      logger.info('Test: Handle non-existent post');
      
      const response = await apiClient.getPostById(999999);
      
      // JSONPlaceholder returns empty object for non-existent IDs
      expect(response.status).toBe(200);
      logger.info('Non-existent post handling test passed');
    });

    test('should handle non-existent user gracefully', async () => {
      logger.info('Test: Handle non-existent user');
      
      const response = await apiClient.getUserById(999999);
      
      // JSONPlaceholder returns empty object for non-existent IDs
      expect(response.status).toBe(200);
      logger.info('Non-existent user handling test passed');
    });
  });
});
