import { NextConfig } from 'next';
import nextra from 'nextra';
import reactFlowPackageJson from '@xyflow/react/package.json' with { type: 'json' };

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
    minimumCacheTTL: 2678400, // 31 days
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
  turbopack: {
    resolveAlias: {
      // Fix an error when `--turbopack` is enabled
      // Module not found: Can't resolve 'next-mdx-import-source-file'
      'next-mdx-import-source-file': './src/mdx-components.tsx',
    },
  },
  rewrites: async () => {
    return [
      {
        source: '/labs/strudel-flow/:path*',
        destination: 'https://flow-machine-xyflow.vercel.app/:path*',
      },
    ];
  },
};

const withNextra = nextra({
  defaultShowCopyCode: true,
  search: false,
});

// Merge MDX config with Next.js config
export default withNextra(nextConfig);
