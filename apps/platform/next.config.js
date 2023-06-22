/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
    serverActions: true,
  },
};

const withMDX = require('@next/mdx')();

module.exports = withMDX(nextConfig);
