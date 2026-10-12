import { scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, SESSION_TTL_SECONDS, createToken, verifyToken } from "@/lib/auth/token";

const scrypt = promisify(scryptCallback) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

export function isConfigured() {
  return Boolean(
    process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH && (process.env.ADMIN_SESSION_SECRET?.length ?? 0) >= 32,
  );
}

// Formato gerado por `npm run admin:senha`: scrypt:<sal base64>:<hash base64>
export async function checkCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "";
  const [scheme, saltB64, hashB64] = (process.env.ADMIN_PASSWORD_HASH ?? "").split(":");
  if (scheme !== "scrypt" || !saltB64 || !hashB64) return false;
  const expectedHash = Buffer.from(hashB64, "base64");
  const actual = await scrypt(password, Buffer.from(saltB64, "base64"), expectedHash.length);
  const emailOk = safeEqual(email.trim().toLowerCase(), expectedEmail);
  return timingSafeEqual(actual, expectedHash) && emailOk;
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function startSession() {
  const store = await cookies();
  store.set(SESSION_COOKIE, createToken(process.env.ADMIN_EMAIL!.trim().toLowerCase()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production" && process.env.ADMIN_COOKIE_INSECURE !== "1",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function endSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function getSession() {
  return verifyToken((await cookies()).get(SESSION_COOKIE)?.value);
}

// Toda página e ação do painel chama isto. O proxy é só a primeira barreira.
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

// Limite simples de tentativas por IP (em memória: suficiente para um único servidor).
const attempts = new Map<string, { count: number; until: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

export function loginBlocked(ip: string) {
  const entry = attempts.get(ip);
  if (!entry) return false;
  if (entry.until < Date.now()) {
    attempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function registerFailure(ip: string) {
  const entry = attempts.get(ip);
  if (!entry || entry.until < Date.now()) attempts.set(ip, { count: 1, until: Date.now() + WINDOW_MS });
  else entry.count += 1;
}

export function clearFailures(ip: string) {
  attempts.delete(ip);
}
