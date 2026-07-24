
import { test } from '@playwright/test';
import { Post } from '../../models/Post';
test('Print First Five Titles', async ({ request }) => {

 const response = await request.get( `${process.env.BASE_URL}/posts` ); 

const posts: Post[] = await response.json();
   for (let i = 0; i < 5; i++) { 
       console.log(posts[i].title); 
    } 
 }); 