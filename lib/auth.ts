import { SignJWT, jwtVerify } from "jose";

const secret = () => new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET || "development-only-secret-change-me");
export async function createSession(email: string) {
  return new SignJWT({ email, role: "admin" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("8h").sign(secret());
}
export async function verifySession(token?: string) {
  if (!token) return false;
  try { await jwtVerify(token, secret()); return true; } catch { return false; }
}
