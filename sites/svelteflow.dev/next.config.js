/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  transpilePackages: ['@xyflow/xy-ui', 'xy-shared'],
};

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

// Merge MDX config with Next.js config
module.exports = withNextra(nextConfig);
