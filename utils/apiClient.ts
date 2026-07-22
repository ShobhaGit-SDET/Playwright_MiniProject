/**
 * API Utilities for JSONPlaceholder
 * Handles all HTTP requests and API interactions
 */

import { expect } from '@playwright/test';
import { logger } from './logger';

const BASE_URL = 'http://jsonplaceholder.typicode.com';

export interface ApiResponse<T> {
  status: number;
  data: T;
  success: boolean;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    city: string;
  };
  phone?: string;
  website?: string;
}

class ApiClient {
  async request<T>(
    endpoint: string,
    method: string = 'GET',
    body?: object
  ): Promise<ApiResponse<T>> {
    try {
      logger.debug(`Making ${method} request to ${BASE_URL}${endpoint}`);
      
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, options);
      const data = (await response.json()) as T;

      const result: ApiResponse<T> = {
        status: response.status,
        data,
        success: response.ok,
      };

      logger.info(`${method} ${endpoint} - Status: ${response.status}`);
      return result;
    } catch (error) {
      logger.error(`API request failed: ${error}`);
      throw error;
    }
  }

  // Posts endpoints
  async getAllPosts(): Promise<ApiResponse<Post[]>> {
    logger.info('Fetching all posts...');
    return this.request<Post[]>('/posts');
  }

  async getPostById(id: number): Promise<ApiResponse<Post>> {
    logger.info(`Fetching post with ID: ${id}`);
    return this.request<Post>(`/posts/${id}`);
  }

  async getPostsByUserId(userId: number): Promise<ApiResponse<Post[]>> {
    logger.info(`Fetching posts for user: ${userId}`);
    return this.request<Post[]>(`/posts?userId=${userId}`);
  }

  async createPost(post: Partial<Post>): Promise<ApiResponse<Post>> {
    logger.info('Creating new post...');
    return this.request<Post>('/posts', 'POST', post);
  }

  async updatePost(id: number, post: Partial<Post>): Promise<ApiResponse<Post>> {
    logger.info(`Updating post with ID: ${id}`);
    return this.request<Post>(`/posts/${id}`, 'PUT', post);
  }

  async deletePost(id: number): Promise<ApiResponse<object>> {
    logger.info(`Deleting post with ID: ${id}`);
    return this.request<object>(`/posts/${id}`, 'DELETE');
  }

  // Users endpoints
  async getAllUsers(): Promise<ApiResponse<User[]>> {
    logger.info('Fetching all users...');
    return this.request<User[]>('/users');
  }

  async getUserById(id: number): Promise<ApiResponse<User>> {
    logger.info(`Fetching user with ID: ${id}`);
    return this.request<User>(`/users/${id}`);
  }

  async createUser(user: Partial<User>): Promise<ApiResponse<User>> {
    logger.info('Creating new user...');
    return this.request<User>('/users', 'POST', user);
  }

  async updateUser(id: number, user: Partial<User>): Promise<ApiResponse<User>> {
    logger.info(`Updating user with ID: ${id}`);
    return this.request<User>(`/users/${id}`, 'PUT', user);
  }

  async deleteUser(id: number): Promise<ApiResponse<object>> {
    logger.info(`Deleting user with ID: ${id}`);
    return this.request<object>(`/users/${id}`, 'DELETE');
  }
}

export const apiClient = new ApiClient();
