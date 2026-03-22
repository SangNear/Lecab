/**
 * API root for RTK Query + fetch.
 * - Default `/api`: proxied by Next.js to the Express server so Set-Cookie applies to localhost:3000
 *   (Edge middleware can read `refreshToken`).
 * - Override with e.g. `NEXT_PUBLIC_API_URL=http://localhost:5000/api` to call the backend directly
 *   (cookies stay on :5000 — Next middleware will not see them).
 */
export const apiRoot = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "/api";
