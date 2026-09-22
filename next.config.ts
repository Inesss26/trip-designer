import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

const nextConfig: NextConfig = {
  // La prévisualisation se fait sur 127.0.0.1 : sans cette autorisation, le
  // rechargement à chaud et l'overlay d'erreurs de `next dev` sont bloqués.
  allowedDevOrigins: ["127.0.0.1"],
  transpilePackages: ["pdfjs-dist", "page-flip"],
  images: {
    remotePatterns: [
      // Images de démonstration, à remplacer par les photos réelles.
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      ...(supabaseHost
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHost,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
