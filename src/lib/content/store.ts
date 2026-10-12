import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

// Tudo o que o proprietário edita fica aqui: JSONs + pasta de uploads.
// Em produção, aponte CONTENT_DIR para uma pasta fora do projeto e inclua-a no backup.
export const CONTENT_DIR = path.resolve(/*turbopackIgnore: true*/ process.env.CONTENT_DIR || path.join(/*turbopackIgnore: true*/ process.cwd(), "storage"));
export const UPLOAD_DIR = path.join(/*turbopackIgnore: true*/ CONTENT_DIR, "uploads");
export const UPLOAD_URL = "/uploads";

export async function readJson<T>(name: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(/*turbopackIgnore: true*/ path.join(/*turbopackIgnore: true*/ CONTENT_DIR, name), "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export async function writeJson(name: string, data: unknown) {
  await mkdir(/*turbopackIgnore: true*/ CONTENT_DIR, { recursive: true });
  const target = path.join(/*turbopackIgnore: true*/ CONTENT_DIR, name);
  const temp = `${target}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(/*turbopackIgnore: true*/ temp, JSON.stringify(data, null, 2), "utf8");
  await rename(/*turbopackIgnore: true*/ temp, target);
}

export async function saveUpload(fileName: string, data: Buffer) {
  await mkdir(/*turbopackIgnore: true*/ UPLOAD_DIR, { recursive: true });
  await writeFile(/*turbopackIgnore: true*/ path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, fileName), data);
  return `${UPLOAD_URL}/${fileName}`;
}

export async function removeUpload(src: string | undefined) {
  if (!src?.startsWith(`${UPLOAD_URL}/`)) return;
  const name = path.basename(src);
  await unlink(/*turbopackIgnore: true*/ path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, name)).catch(() => undefined);
}

export function uploadPath(name: string) {
  const safe = path.basename(name);
  if (safe !== name || safe.startsWith(".")) return null;
  return path.join(/*turbopackIgnore: true*/ UPLOAD_DIR, safe);
}
