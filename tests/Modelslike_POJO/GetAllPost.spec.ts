import { test, expect } from '@playwright/test';
import { Post } from '../../models/Post';
 test('Get All Posts', async ({ request }) => { 

    const response = await request.get( `${process.env.BASE_URL}/posts` ); 
     expect(response.status()).toBe(200); 
     const posts: Post[] = await response.json(); 

      console.log(posts.length); 
      //console.log(posts);

       expect(posts.length).toBeGreaterThan(0); 
    
    }); 