// ---------- Helper to build Basic Authorization header ----------
export function basicAuthHeader(username: string, password: string) {
  const token = Buffer.from(`${username}:${password}`).toString('base64');
  // token contains encoded string for username:password
  return `Basic ${token}`;
}
 