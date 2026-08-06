/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Pin the workspace root so a stray lockfile in the home
    // directory doesn't confuse Turbopack.
    root: import.meta.dirname,
  },
};

export default nextConfig;
