"use strict";
/**
 * API Utilities for JSONPlaceholder
 * Handles all HTTP requests and API interactions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiClient = void 0;
const logger_1 = require("./logger");
const BASE_URL = 'http://jsonplaceholder.typicode.com';
class ApiClient {
    async request(endpoint, method = 'GET', body) {
        try {
            logger_1.logger.debug(`Making ${method} request to ${BASE_URL}${endpoint}`);
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            if (body) {
                options.body = JSON.stringify(body);
            }
            const response = await fetch(`${BASE_URL}${endpoint}`, options);
            const data = (await response.json());
            const result = {
                status: response.status,
                data,
                success: response.ok,
            };
            logger_1.logger.info(`${method} ${endpoint} - Status: ${response.status}`);
            return result;
        }
        catch (error) {
            logger_1.logger.error(`API request failed: ${error}`);
            throw error;
        }
    }
    // Posts endpoints
    async getAllPosts() {
        logger_1.logger.info('Fetching all posts...');
        return this.request('/posts');
    }
    async getPostById(id) {
        logger_1.logger.info(`Fetching post with ID: ${id}`);
        return this.request(`/posts/${id}`);
    }
    async getPostsByUserId(userId) {
        logger_1.logger.info(`Fetching posts for user: ${userId}`);
        return this.request(`/posts?userId=${userId}`);
    }
    async createPost(post) {
        logger_1.logger.info('Creating new post...');
        return this.request('/posts', 'POST', post);
    }
    async updatePost(id, post) {
        logger_1.logger.info(`Updating post with ID: ${id}`);
        return this.request(`/posts/${id}`, 'PUT', post);
    }
    async deletePost(id) {
        logger_1.logger.info(`Deleting post with ID: ${id}`);
        return this.request(`/posts/${id}`, 'DELETE');
    }
    // Users endpoints
    async getAllUsers() {
        logger_1.logger.info('Fetching all users...');
        return this.request('/users');
    }
    async getUserById(id) {
        logger_1.logger.info(`Fetching user with ID: ${id}`);
        return this.request(`/users/${id}`);
    }
    async createUser(user) {
        logger_1.logger.info('Creating new user...');
        return this.request('/users', 'POST', user);
    }
    async updateUser(id, user) {
        logger_1.logger.info(`Updating user with ID: ${id}`);
        return this.request(`/users/${id}`, 'PUT', user);
    }
    async deleteUser(id) {
        logger_1.logger.info(`Deleting user with ID: ${id}`);
        return this.request(`/users/${id}`, 'DELETE');
    }
}
exports.apiClient = new ApiClient();
//# sourceMappingURL=apiClient.js.map