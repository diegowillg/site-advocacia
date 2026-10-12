import { createHmac, timingSafeEqual } from "node:crypto";

// Sessão = payload assinado com HMAC. Sem banco: trocar ADMIN_SESSION_SECRET derruba todas as sessões.
export const SESSION_COOKIE = "adm_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 12;

type Payload = { sub: string; exp: number };

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) return null;
  return value;
}

function sign(data: string, key: string) {
  return createHmac("sha256", key).update(data).digest("base64url");
}

export function createToken(sub: string) {
  const key = secret();
  if (!key) throw new Error("ADMIN_SESSION_SECRET ausente ou curto (mínimo 32 caracteres).");
  const payload: Payload = { sub, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data, key)}`;
}

export function verifyToken(token: string | undefined): Payload | null {
  const key = secret();
  if (!key || !token) return null;
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;
  const expected = Buffer.from(sign(data, key));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString()) as Payload;
    if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000) return null;
    if (payload.sub !== process.env.ADMIN_EMAIL?.trim().toLowerCase()) return null;
    return payload;
  } catch {
    return null;
  }
}
