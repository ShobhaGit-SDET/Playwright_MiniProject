/**
 * Test Data and Helper Utilities
 * Contains reusable test data and utility functions
 */
import { Post, User } from './apiClient';
export declare class TestDataHelper {
    static generateMockPost(overrides?: Partial<Post>): Partial<Post>;
    static generateMockUser(overrides?: Partial<User>): Partial<User>;
}
export declare class AssertionHelper {
    static assertPostStructure(post: any): void;
    static assertUserStructure(user: any): void;
    static assertResponseStatus(status: number, expectedStatus: number): void;
    static assertArrayNotEmpty<T>(array: T[]): void;
}
export declare class DataValidator {
    static isValidEmail(email: string): boolean;
    static isValidUrl(url: string): boolean;
    static isPostValid(post: Post): boolean;
    static isUserValid(user: User): boolean;
}
//# sourceMappingURL=testHelpers.d.ts.map