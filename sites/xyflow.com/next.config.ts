import { createRequire } from 'node:module';
import { NextConfig } from 'next';
import nextra from 'nextra';
import reactFlowPackageJson from '@xyflow/react/package.json' with { type: 'json' };

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
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/react/**',
      },
    ],
  },
  env: {
    REACT_FLOW_VERSION: reactFlowPackageJson.version,
    NEXT_PUBLIC_EXAMPLES_URL:
    process.env.VERCEL_ENV === 'preview'
      ? `https://example-apps-git-${process.env.VERCEL_GIT_COMMIT_REF}-xyflow.vercel.app`
      : process.env.NEXT_PUBLIC_EXAMPLES_URL,
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Fixes TypeError: Cannot read properties of undefined (reading 'ReactCurrentOwner') by
      // overriding package version to 9-rc which supports Next.js 15
      '@react-three/fiber': require.resolve('@react-three/fiber'),
    };
  },
};

const withNextra = nextra({
  search: false,
  contentDirBasePath: '/blog'
});

// Merge MDX config with Next.js config
export default withNextra(nextConfig);
