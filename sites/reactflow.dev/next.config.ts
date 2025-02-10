import redirects from './redirects.json' with { type: 'json' };
import pkg from './package.json' with { type: 'json' };

import nextra from 'nextra';
import { NextConfig } from 'next';

const REACT_FLOW_VERSION = pkg.dependencies['@xyflow/react']?.replace('^', '');

const nextConfig: NextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  transpilePackages: ['@xyflow/xy-ui', 'xy-shared'],
  experimental: {
    optimizePackageImports: ['@xyflow/xy-ui', 'xy-shared'],
  },
  async redirects() {
    return redirects;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.reactflow.dev',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5173',
        pathname: '/react/**',
      },
      {
        protocol: 'https',
        hostname: 'example-apps.xyflow.com',
        pathname: '/react/**',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/react/**',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
    ],
  },
  env: {
    REACT_FLOW_VERSION,
    NEXT_PUBLIC_EXAMPLES_URL:
      process.env.VERCEL_ENV === 'preview'
        ? `https://example-apps-git-${process.env.VERCEL_GIT_COMMIT_REF}-xyflow.vercel.app`
        : process.env.NEXT_PUBLIC_EXAMPLES_URL,
    NEXT_PUBLIC_UI_COMPONENTS_URL:
      process.env.VERCEL_ENV === 'preview'
        ? `https://ui-components-git-${process.env.VERCEL_GIT_COMMIT_REF}-xyflow.vercel.app`
        : process.env.NEXT_PUBLIC_UI_COMPONENTS_URL,
  },
};

const withNextra = nextra({
  search: false
});

// Merge MDX config with Next.js config
export default withNextra(nextConfig);
