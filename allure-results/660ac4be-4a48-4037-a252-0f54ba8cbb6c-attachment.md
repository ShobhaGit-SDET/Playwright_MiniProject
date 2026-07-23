# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: basicAuthwithenv.spec.ts >> [Basic Auth - Failure] Postman Echo basic auth with WRONG credentials should be 401
- Location: tests\basicAuthwithenv.spec.ts:53:5

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
  33 |   const res = await request.get(`${process.env.BASE_URL}/basic-auth`, {
  34 |     headers: {
  35 |       Authorization: basicAuthHeader(process.env.USER!, process.env.PASS!),
  36 |       Accept: 'application/json',
  37 |     },
  38 |   });
  39 |  
  40 |   // Validate HTTP status
  41 |   expect(res.status(), 'Expected 200 OK for valid basic auth').toBe(200);
  42 |  
  43 |   // Validate body
  44 |   const body = await res.json();
  45 |   // Postman Echo typically returns: { authenticated: true }
  46 |   expect(body).toMatchObject({
  47 |     authenticated: true,
  48 |   });
  49 |  
  50 | });
  51 |  
  52 | // ---------- Negative Case: Wrong Credentials ----------
  53 | test('[Basic Auth - Failure] Postman Echo basic auth with WRONG credentials should be 401', async ({ request }) => {
  54 | //   const BASE_URL = 'https://postman-echo.com';
  55 | //   const USER = 'rahul';
  56 | //   const WRONG_PASS = 'dravid';
  57 |  
> 58 |   const res = await request.get(`${process.env.BASE_URL}/basic-auth`, {
     |                             ^ TypeError: apiRequestContext.get: Invalid URL
  59 |     headers: {
  60 |       Authorization: basicAuthHeader(process.env.USER!, process.env.WRONG_PASS!),
  61 |       Accept: 'application/json',
  62 |     },
  63 |   });
  64 |  
  65 |   expect(res.status(), 'Expected 401 Unauthorized for wrong credentials').toBe(401);
  66 |  
  67 |   const text = await res.text();
  68 |   // Content may be an HTML/JSON depending on implementation; we just assert status
  69 |   expect(text.length).toBeGreaterThan(0);
  70 | });
  71 |  
  72 | // ---------- Negative Case: Missing Authorization Header ----------
  73 | test('[Basic Auth - Missing Header] Postman Echo should respond 401 when Authorization header is absent', async ({ request }) => {
  74 |   // const BASE_URL = 'https://postman-echo.com';
  75 |  
  76 |   const res = await request.get(`${process.env.BASE_URL}/basic-auth`, {
  77 |     headers: { Accept: 'application/json' },
  78 |   });
  79 |  
  80 |   expect(res.status(), 'Expected 401 Unauthorized when header is missing').toBe(401);
  81 |  
  82 |   const text = await res.text();
  83 |   expect(text.length).toBeGreaterThan(0);
  84 | });
  85 |  
  86 |  
  87 |  
  88 | 
  89 |  
```