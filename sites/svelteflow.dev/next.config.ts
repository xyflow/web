import { NextConfig } from 'next';
import nextra from 'nextra';
// @ts-expect-error -- we use patch, remove patch after merge https://github.com/xyflow/xyflow/pull/5019
import svelteFlowPackageJson from '@xyflow/svelte/package.json';
import { parsePreviewDeploySlug } from 'xy-shared';

const previewDeploySlug = parsePreviewDeploySlug(process.env.VERCEL_URL);

const nextConfig: NextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  transpilePackages: ['@xyflow/xy-ui', 'xy-shared'],
  experimental: {
    optimizePackageImports: ['@xyflow/xy-ui', 'xy-shared'],
  },
  env: {
    SVELTE_FLOW_VERSION: svelteFlowPackageJson.version,
    NEXT_PUBLIC_EXAMPLES_URL:
      process.env.VERCEL_ENV === 'preview'
        ? `https://example-apps-git-${previewDeploySlug}.vercel.app`
        : process.env.NEXT_PUBLIC_EXAMPLES_URL,
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
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/svelte/**',
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
};

const withNextra = nextra({
  search: false,
});

// Merge MDX config with Next.js config
export default withNextra(nextConfig);
