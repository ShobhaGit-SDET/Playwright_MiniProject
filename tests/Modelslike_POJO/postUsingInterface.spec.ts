
import { test, expect } from '@playwright/test';
import { Post } from '../../models/Post';
test('Create Post', async ({ request }) => { 
 const newPost: Post = { 
userId: 1,
  title: 'Playwright API Testing', 
body: 'Learning Interfaces' 
       };
   const response = await request.post( `${process.env.BASE_URL}/posts`, 
   { 
     data: newPost 
     }
  ); 
    expect(response.status()).toBe(201); 
       const createdPost: Post = await response.json(); 
        console.log(createdPost); 
    });