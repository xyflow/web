import { createRequire } from 'node:module';
import redirects from './redirects.json' with { type: 'json' };
import reactFlowPackageJson from '@xyflow/react/package.json' with { type: 'json' };

import nextra from 'nextra';
import { NextConfig } from 'next';

const require = createRequire(import.meta.url);

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
    REACT_FLOW_VERSION: reactFlowPackageJson.version,
    NEXT_PUBLIC_EXAMPLES_URL:
      process.env.VERCEL_ENV === 'preview'
        ? `https://example-apps-git-${process.env.VERCEL_GIT_COMMIT_REF}-xyflow.vercel.app`
        : process.env.NEXT_PUBLIC_EXAMPLES_URL,
    NEXT_PUBLIC_UI_COMPONENTS_URL:
      process.env.VERCEL_ENV === 'preview'
        ? `https://ui-components-git-${process.env.VERCEL_GIT_COMMIT_REF}-xyflow.vercel.app`
        : process.env.NEXT_PUBLIC_UI_COMPONENTS_URL,
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Fixes TypeError: Cannot read properties of undefined (reading 'ReactCurrentOwner') by
      // overriding package version to 9-rc which supports Next.js 16
      '@react-three/fiber': require.resolve('@react-three/fiber'),
    };
  }
};

const withNextra = nextra({
  search: false,
});

// Merge MDX config with Next.js config
export default withNextra(nextConfig);
