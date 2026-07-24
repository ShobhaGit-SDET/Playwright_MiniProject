
import { test, expect } from '@playwright/test';

import { Post } from '../../models/Post';

test('Validate Post Details', async ({ request }) => {

    const response = await request.get(`${process.env.BASE_URL}/posts/1`);
    const post: Post = await response.json();
    console.log(post);
    expect(post.userId).toBe(1);
    expect(post.title.length).toBeGreaterThan(0);
    expect(post.body.length).toBeGreaterThan(0);
}); 