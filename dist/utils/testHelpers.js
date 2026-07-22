"use strict";
/**
 * Test Data and Helper Utilities
 * Contains reusable test data and utility functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataValidator = exports.AssertionHelper = exports.TestDataHelper = void 0;
const test_1 = require("@playwright/test");
class TestDataHelper {
    static generateMockPost(overrides) {
        return {
            userId: 1,
            title: 'Test Post Title',
            body: 'This is a test post body',
            ...overrides,
        };
    }
    static generateMockUser(overrides) {
        return {
            name: 'Test User',
            username: 'testuser',
            email: 'test@example.com',
            phone: '123-456-7890',
            website: 'test.com',
            ...overrides,
        };
    }
}
exports.TestDataHelper = TestDataHelper;
class AssertionHelper {
    static assertPostStructure(post) {
        (0, test_1.expect)(post).toHaveProperty('userId');
        (0, test_1.expect)(post).toHaveProperty('id');
        (0, test_1.expect)(post).toHaveProperty('title');
        (0, test_1.expect)(post).toHaveProperty('body');
        (0, test_1.expect)(typeof post.userId).toBe('number');
        (0, test_1.expect)(typeof post.id).toBe('number');
        (0, test_1.expect)(typeof post.title).toBe('string');
        (0, test_1.expect)(typeof post.body).toBe('string');
    }
    static assertUserStructure(user) {
        (0, test_1.expect)(user).toHaveProperty('id');
        (0, test_1.expect)(user).toHaveProperty('name');
        (0, test_1.expect)(user).toHaveProperty('username');
        (0, test_1.expect)(user).toHaveProperty('email');
        (0, test_1.expect)(typeof user.id).toBe('number');
        (0, test_1.expect)(typeof user.name).toBe('string');
        (0, test_1.expect)(typeof user.username).toBe('string');
        (0, test_1.expect)(typeof user.email).toBe('string');
    }
    static assertResponseStatus(status, expectedStatus) {
        (0, test_1.expect)(status).toBe(expectedStatus);
    }
    static assertArrayNotEmpty(array) {
        (0, test_1.expect)(array.length).toBeGreaterThan(0);
    }
}
exports.AssertionHelper = AssertionHelper;
class DataValidator {
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static isValidUrl(url) {
        try {
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    }
    static isPostValid(post) {
        return (post.userId > 0 &&
            post.id > 0 &&
            post.title.length > 0 &&
            post.body.length > 0);
    }
    static isUserValid(user) {
        return (user.id > 0 &&
            user.name.length > 0 &&
            user.username.length > 0 &&
            this.isValidEmail(user.email));
    }
}
exports.DataValidator = DataValidator;
//# sourceMappingURL=testHelpers.js.map