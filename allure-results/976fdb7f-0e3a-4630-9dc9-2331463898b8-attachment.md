# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: basicAuthwithenv.spec.ts >> [Basic Auth - Success] Postman Echo basic auth with correct credentials
- Location: tests\basicAuthwithenv.spec.ts:25:5

# Error details

```
TypeError: apiRequestContext.get: Invalid URL
```

# Test source

```ts
  1  | 
  2  | 
  3  | import { test, expect } from '@playwright/test';
  4  | import { basicAuthHeader } from '../utils/auth_utils';
  5  | //import { ENV } from '../utils/env';
  6  | 
  7  | // import { env } from 'node:process';
  8  | 
  9  |  
  10 | /**
  11 |  * Basic Auth with Postman Echo
  12 |  * Endpoints:
  13 |  *   - POSTMAN ECHO base: https://postman-echo.com
  14 |  *   - Basic Auth endpoint: /basic-auth
  15 |  *
  16 |  * Behavior:
  17 |  *   - If Authorization: Basic <base64(user:pass)> is present and valid,
  18 |  *     the service returns { authenticated: true, user: "<username>" }.
  19 |  *   - If missing/invalid, it returns 401 Unauthorized.
  20 |  *
  21 |  */
  22 |  
  23 |  
  24 | // ---------- Positive Case: Correct Credentials ----------
  25 | test('[Basic Auth - Success] Postman Echo basic auth with correct credentials', async ({ request }) => {
  26 | //  const BASE_URL = 'https://postman-echo.com';
  27 | //   const USER = USERNAME;
  28 | //   const PASS = PASSWORD;
  29 | 
  30 |  
  31 |  
  32 |   // Authorization: Basic base64(user:pass)
  33 |   //const res = await request.get(`${process.env.BASE_URL}/basic-auth`, {
> 34 |   const res = await request.get(`process.env.BASE_URL/basic-auth`, {  
     |                             ^ TypeError: apiRequestContext.get: Invalid URL
  35 |     
  36 |     headers: {
  37 |       Authorization: basicAuthHeader(process.env.USER!, process.env.PASS!),
  38 |       Accept: 'application/json',
  39 |     },
  40 |   });
  41 |  
  42 |   // Validate HTTP status
  43 |   expect(res.status(), 'Expected 200 OK for valid basic auth').toBe(200);
  44 |  
  45 |   // Validate body
  46 |   const body = await res.json();
  47 |   // Postman Echo typically returns: { authenticated: true }
  48 |   expect(body).toMatchObject({
  49 |     authenticated: true,
  50 |   });
  51 |  
  52 | });
  53 |  
  54 | // ---------- Negative Case: Wrong Credentials ----------
  55 | test('[Basic Auth - Failure] Postman Echo basic auth with WRONG credentials should be 401', async ({ request }) => {
  56 | //   const BASE_URL = 'https://postman-echo.com';
  57 | //   const USER = 'rahul';
  58 | //   const WRONG_PASS = 'dravid';
  59 |  
  60 |   const res = await request.get(`${process.env.BASE_URL}/basic-auth`, {
  61 |     headers: {
  62 |       Authorization: basicAuthHeader(process.env.USER!, process.env.WRONG_PASS!),
  63 |       Accept: 'application/json',
  64 |     },
  65 |   });
  66 |  
  67 |   expect(res.status(), 'Expected 401 Unauthorized for wrong credentials').toBe(401);
  68 |  
  69 |   const text = await res.text();
  70 |   // Content may be an HTML/JSON depending on implementation; we just assert status
  71 |   expect(text.length).toBeGreaterThan(0);
  72 | });
  73 |  
  74 | // ---------- Negative Case: Missing Authorization Header ----------
  75 | test('[Basic Auth - Missing Header] Postman Echo should respond 401 when Authorization header is absent', async ({ request }) => {
  76 |   // const BASE_URL = 'https://postman-echo.com';
  77 |  
  78 |   const res = await request.get(`${process.env.BASE_URL}/basic-auth`, {
  79 |     headers: { Accept: 'application/json' },
  80 |   });
  81 |  
  82 |   expect(res.status(), 'Expected 401 Unauthorized when header is missing').toBe(401);
  83 |  
  84 |   const text = await res.text();
  85 |   expect(text.length).toBeGreaterThan(0);
  86 | });
  87 |  
  88 |  
  89 |  
  90 | 
  91 |  
```