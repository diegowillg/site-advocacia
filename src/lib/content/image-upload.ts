import { randomBytes } from "node:crypto";
import sharp from "sharp";
import { saveUpload } from "@/lib/content/store";

export const MAX_UPLOAD_MB = 10;

// Converte qualquer foto enviada (JPG, PNG, HEIC do iPhone...) em WebP leve, girada corretamente e sem metadados.
export async function storeImage(file: File, prefix: string, maxSize = 1800) {
  if (file.size > MAX_UPLOAD_MB * 1024 * 1024) throw new Error(`A imagem passa de ${MAX_UPLOAD_MB} MB.`);
  const input = Buffer.from(await file.arrayBuffer());
  let output: Buffer;
  try {
    output = await sharp(input, { failOn: "error" })
      .rotate()
      .resize({ width: maxSize, height: maxSize, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    throw new Error("Arquivo não reconhecido como imagem. Use JPG, PNG ou WebP.");
  }
  const name = `${prefix.replace(/[^a-z0-9-]/gi, "").slice(0, 40) || "img"}-${Date.now().toString(36)}${randomBytes(3).toString("hex")}.webp`;
  return saveUpload(name, output);
}

export function hasFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}
