 import { test, expect } from '@playwright/test'; 

  import { Post } from '../../models/Post'; 

 test('Get Post', async ({ request }) => { 

    // const base_url = process.env.BASE_URL

   const response = await request.get(`${process.env.BASE_URL}/posts/1`);
    
    // 'https://jsonplaceholder.typicode.com/posts/1');

  expect(response.status()).toBe(200); 

  const post: Post = await response.json(); 
  console.log(post); 
expect(post.id).toBe(1);       
expect(post.userId).toBe(1);

    }); 