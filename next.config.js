/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dehxgov2k/image/**",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/dehxgov2k/image/**",
      },
    ],
  },
};

module.exports = nextConfig;
