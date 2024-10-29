import pkg from './package.json' with { type: 'json' };
import nextra from 'nextra';

const SVELTE_FLOW_VERSION = pkg.dependencies['@xyflow/svelte']?.replace(
  '^',
  '',
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  transpilePackages: ['@xyflow/xy-ui', 'xy-shared'],
  env: {
    SVELTE_FLOW_VERSION,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.svelteflow.dev',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5173',
        pathname: '/svelte/**',
      },
      {
        protocol: 'https',
        hostname: 'example-apps.xyflow.com',
        pathname: '/svelte/**',
      },
    ],
  },
};

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

// Merge MDX config with Next.js config
export default withNextra(nextConfig);
