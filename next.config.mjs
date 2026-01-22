/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    // Prevent corrupted webpack PackFile cache issues (ENOENT .pack.gz) in dev.
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
