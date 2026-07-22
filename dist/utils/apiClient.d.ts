/**
 * API Utilities for JSONPlaceholder
 * Handles all HTTP requests and API interactions
 */
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
declare class ApiClient {
    request<T>(endpoint: string, method?: string, body?: object): Promise<ApiResponse<T>>;
    getAllPosts(): Promise<ApiResponse<Post[]>>;
    getPostById(id: number): Promise<ApiResponse<Post>>;
    getPostsByUserId(userId: number): Promise<ApiResponse<Post[]>>;
    createPost(post: Partial<Post>): Promise<ApiResponse<Post>>;
    updatePost(id: number, post: Partial<Post>): Promise<ApiResponse<Post>>;
    deletePost(id: number): Promise<ApiResponse<object>>;
    getAllUsers(): Promise<ApiResponse<User[]>>;
    getUserById(id: number): Promise<ApiResponse<User>>;
    createUser(user: Partial<User>): Promise<ApiResponse<User>>;
    updateUser(id: number, user: Partial<User>): Promise<ApiResponse<User>>;
    deleteUser(id: number): Promise<ApiResponse<object>>;
}
export declare const apiClient: ApiClient;
export {};
//# sourceMappingURL=apiClient.d.ts.map