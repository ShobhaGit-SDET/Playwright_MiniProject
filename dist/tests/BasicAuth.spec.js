"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const auth_utils_1 = require("../utils/auth_utils");
/**
 * Basic Auth with Postman Echo
 * Endpoints:
 *   - POSTMAN ECHO base: https://postman-echo.com
 *   - Basic Auth endpoint: /basic-auth
 *
 * Behavior:
 *   - If Authorization: Basic <base64(user:pass)> is present and valid,
 *     the service returns { authenticated: true, user: "<username>" }.
 *   - If missing/invalid, it returns 401 Unauthorized.
 *
 */
// ---------- Positive Case: Correct Credentials ----------
(0, test_1.test)('[Basic Auth - Success] Postman Echo basic auth with correct credentials', async ({ request }) => {
    const BASE_URL = 'https://postman-echo.com';
    const USER = 'postman';
    const PASS = 'password';
    // Authorization: Basic base64(user:pass)
    const res = await request.get(`${BASE_URL}/basic-auth`, {
        headers: {
            Authorization: (0, auth_utils_1.basicAuthHeader)(USER, PASS),
            Accept: 'application/json',
        },
    });
    // Validate HTTP status
    (0, test_1.expect)(res.status(), 'Expected 200 OK for valid basic auth').toBe(200);
    // Validate body
    const body = await res.json();
    // Postman Echo typically returns: { authenticated: true }
    (0, test_1.expect)(body).toMatchObject({
        authenticated: true,
    });
});
// ---------- Negative Case: Wrong Credentials ----------
(0, test_1.test)('[Basic Auth - Failure] Postman Echo basic auth with WRONG credentials should be 401', async ({ request }) => {
    const BASE_URL = 'https://postman-echo.com';
    const USER = 'rahul';
    const WRONG_PASS = 'dravid';
    const res = await request.get(`${BASE_URL}/basic-auth`, {
        headers: {
            Authorization: (0, auth_utils_1.basicAuthHeader)(USER, WRONG_PASS),
            Accept: 'application/json',
        },
    });
    (0, test_1.expect)(res.status(), 'Expected 401 Unauthorized for wrong credentials').toBe(401);
    const text = await res.text();
    // Content may be an HTML/JSON depending on implementation; we just assert status
    (0, test_1.expect)(text.length).toBeGreaterThan(0);
});
// ---------- Negative Case: Missing Authorization Header ----------
(0, test_1.test)('[Basic Auth - Missing Header] Postman Echo should respond 401 when Authorization header is absent', async ({ request }) => {
    const BASE_URL = 'https://postman-echo.com';
    const res = await request.get(`${BASE_URL}/basic-auth`, {
        headers: { Accept: 'application/json' },
    });
    (0, test_1.expect)(res.status(), 'Expected 401 Unauthorized when header is missing').toBe(401);
    const text = await res.text();
    (0, test_1.expect)(text.length).toBeGreaterThan(0);
});
//# sourceMappingURL=BasicAuth.spec.js.map