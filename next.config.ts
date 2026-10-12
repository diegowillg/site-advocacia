import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // Upload de fotos pelo painel (até 10 MB + margem do formulário).
    serverActions: { bodySizeLimit: "11mb" },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Guarda as versões otimizadas por 7 dias. Troque o nome do arquivo ao substituir uma foto.
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  async headers() {
    return [
      {
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
