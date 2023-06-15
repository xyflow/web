const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
};

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
});

module.exports = withNextra(nextConfig);
