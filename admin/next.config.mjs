/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@ciba/shared"],
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
};

export default nextConfig;
