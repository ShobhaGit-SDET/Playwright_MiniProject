# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: BasicAuth.spec.ts >> [Basic Auth - Success] Postman Echo basic auth with correct credentials
- Location: tests\BasicAuth.spec.ts:19:5

# Error details

```
Error: Expected 200 OK for valid basic auth

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { basicAuthHeader } from '../utils/auth_utils';
  3  |  
  4  | /**
  5  |  * Basic Auth with Postman Echo
  6  |  * Endpoints:
  7  |  *   - POSTMAN ECHO base: https://postman-echo.com
  8  |  *   - Basic Auth endpoint: /basic-auth
  9  |  *
  10 |  * Behavior:
  11 |  *   - If Authorization: Basic <base64(user:pass)> is present and valid,
  12 |  *     the service returns { authenticated: true, user: "<username>" }.
  13 |  *   - If missing/invalid, it returns 401 Unauthorized.
  14 |  *
  15 |  */
  16 |  
  17 |  
  18 | // ---------- Positive Case: Correct Credentials ----------
  19 | test('[Basic Auth - Success] Postman Echo basic auth with correct credentials', async ({ request }) => {
  20 | //   const baseUrl = process.env.BASE_URL1 ?? '';
  21 | //   const username = process.env.USER ?? 'postman';
  22 | //   const password = process.env.PASSWORD ??'password';
  23 |  
  24 |  
  25 |   // Authorization: Basic base64(user:pass)
  26 |   const res = await request.get(`${process.env.BASE_URL1}/basic-auth`, {
  27 |     headers: {
  28 |       Authorization: basicAuthHeader(process.env.USERNAME!, process.env.PASSWORD!),
  29 |       Accept: 'application/json',
  30 |     },
  31 |   });
  32 |  
  33 |   // Validate HTTP status
> 34 |   expect(res.status(), 'Expected 200 OK for valid basic auth').toBe(200);
     |                                                                ^ Error: Expected 200 OK for valid basic auth
  35 |  
  36 |   // Validate body
  37 |   const body = await res.json();
  38 |   // Postman Echo typically returns: { authenticated: true }
  39 |   expect(body).toMatchObject({
  40 |     authenticated: true,
  41 |   });
  42 |  
  43 | });
  44 |  
  45 | // ---------- Negative Case: Wrong Credentials ----------
  46 | test('[Basic Auth - Failure] Postman Echo basic auth with WRONG credentials should be 401', async ({ request }) => {
  47 | //   const BASE_URL = 'https://postman-echo.com';
  48 | //   const USER = 'rahul';
  49 | //   const WRONG_PASS = 'dravid';
  50 |  
  51 |   const res = await request.get(`${process.env.BASE_URL1}/basic-auth`, {
  52 |     headers: {
  53 |       Authorization: basicAuthHeader(process.env.USERNAME!, process.env.WRONG_PASS!),
  54 |       Accept: 'application/json',
  55 |     },
  56 |   });
  57 |  
  58 |   expect(res.status(), 'Expected 401 Unauthorized for wrong credentials').toBe(401);
  59 |  
  60 |   const text = await res.text();
  61 |   // Content may be an HTML/JSON depending on implementation; we just assert status
  62 |   expect(text.length).toBeGreaterThan(0);
  63 | });
  64 |  
  65 | // ---------- Negative Case: Missing Authorization Header ----------
  66 | test('[Basic Auth - Missing Header] Postman Echo should respond 401 when Authorization header is absent', async ({ request }) => {
  67 | //   const BASE_URL = 'https://postman-echo.com';
  68 |  
  69 |   const res = await request.get(`${process.env.BASE_URL1}/basic-auth`, {
  70 |     headers: { Accept: 'application/json' },
  71 |   });
  72 |  
  73 |   expect(res.status(), 'Expected 401 Unauthorized when header is missing').toBe(401);
  74 |  
  75 |   const text = await res.text();
  76 |   expect(text.length).toBeGreaterThan(0);
  77 | });
  78 |  
  79 |  
  80 |  
  81 | 
  82 |  
```