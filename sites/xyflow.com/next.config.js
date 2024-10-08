const REACT_FLOW_VERSION = require('./package.json').dependencies[
  '@xyflow/react'
]?.replace('^', '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  transpilePackages: ['@xyflow/xy-ui', 'xy-shared'],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.star-history.com',
        port: '',
        pathname: '/svg',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5173',
      },
      {
        protocol: 'https',
        hostname: 'example-apps.xyflow.com',
        pathname: '/svelte/**',
      },
      {
        protocol: 'https',
        hostname: 'example-apps.xyflow.com',
        pathname: '/react/**',
      },
    ],
  },
  env: {
    REACT_FLOW_VERSION,
  },
};

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

// Merge MDX config with Next.js config
module.exports = withNextra(nextConfig);
