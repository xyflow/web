/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  transpilePackages: ['ui'],
  redirects: async () => [
    {
      source: '/docs/examples/:path*',
      destination: '/react-flow/examples/:path*',
      permanent: false,
    },
    {
      source: '/docs/quickstart',
      destination: '/react-flow/api',
      permanent: false,
    },
    {
      source: '/docs/guides/:path*',
      destination: '/react-flow/docs/:path*',
      permanent: false,
    },
    {
      source: '/docs/api/:path*',
      destination: '/react-flow/api/:path*',
      permanent: false,
    },
  ]
};

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
});

// Merge MDX config with Next.js config
module.exports = withNextra(nextConfig);
