# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: post.spec.ts >> Get Post
- Location: tests\post.spec.ts:5:6

# Error details

```
TypeError: apiRequestContext.get: Invalid URL
```

# Test source

```ts
  1  |  import { test, expect } from '@playwright/test'; 
  2  | 
  3  |   import { Post } from '../models/Post'; 
  4  | 
  5  |  test('Get Post', async ({ request }) => { 
  6  | 
  7  |     const base_url = process.env.BASE_URL
  8  | 
> 9  |    const response = await request.get('${base_url}posts/1');
     |                                   ^ TypeError: apiRequestContext.get: Invalid URL
  10 |     
  11 |     // 'https://jsonplaceholder.typicode.com/posts/1');
  12 | 
  13 |   expect(response.status()).toBe(200); 
  14 | 
  15 |   const post: Post = await response.json(); 
  16 |   console.log(post); 
  17 | expect(post.id).toBe(1);       
  18 | expect(post.userId).toBe(1);
  19 | 
  20 |     }); 
```