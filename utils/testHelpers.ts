/**
 * Test Data and Helper Utilities
 * Contains reusable test data and utility functions
 */

import { expect } from '@playwright/test';
import { Post, User } from './apiClient';

export class TestDataHelper {
  static generateMockPost(overrides?: Partial<Post>): Partial<Post> {
    return {
      userId: 1,
      title: 'Test Post Title',
      body: 'This is a test post body',
      ...overrides,
    };
  }

  static generateMockUser(overrides?: Partial<User>): Partial<User> {
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

export class AssertionHelper {
  static assertPostStructure(post: any): void {
    expect(post).toHaveProperty('userId');
    expect(post).toHaveProperty('id');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
    expect(typeof post.userId).toBe('number');
    expect(typeof post.id).toBe('number');
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
  }

  static assertUserStructure(user: any): void {
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('email');
    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
    expect(typeof user.username).toBe('string');
    expect(typeof user.email).toBe('string');
  }

  static assertResponseStatus(status: number, expectedStatus: number): void {
    expect(status).toBe(expectedStatus);
  }

  static assertArrayNotEmpty<T>(array: T[]): void {
    expect(array.length).toBeGreaterThan(0);
  }
}

export class DataValidator {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static isPostValid(post: Post): boolean {
    return (
      post.userId > 0 &&
      post.id > 0 &&
      post.title.length > 0 &&
      post.body.length > 0
    );
  }

  static isUserValid(user: User): boolean {
    return (
      user.id > 0 &&
      user.name.length > 0 &&
      user.username.length > 0 &&
      this.isValidEmail(user.email)
    );
  }
}
