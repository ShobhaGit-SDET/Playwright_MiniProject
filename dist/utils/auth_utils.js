"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicAuthHeader = basicAuthHeader;
// ---------- Helper to build Basic Authorization header ----------
function basicAuthHeader(username, password) {
    const token = Buffer.from(`${username}:${password}`).toString('base64');
    // token contains encoded string for username:password
    return `Basic ${token}`;
}
//# sourceMappingURL=auth_utils.js.map