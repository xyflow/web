/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['xy-ui'],
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
