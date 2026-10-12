import { readFile } from "node:fs/promises";
import { uploadPath } from "@/lib/content/store";

const TYPES: Record<string, string> = {
  webp: "image/webp",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  avif: "image/avif",
};

// Serve as imagens enviadas pelo painel. Cada upload recebe nome único, então pode ficar em cache para sempre.
export async function GET(_request: Request, { params }: RouteContext<"/uploads/[name]">) {
  const { name } = await params;
  const file = uploadPath(name);
  const type = TYPES[name.split(".").pop()?.toLowerCase() ?? ""];
  if (!file || !type) return new Response("Not found", { status: 404 });
  try {
    const data = await readFile(/*turbopackIgnore: true*/ file);
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
