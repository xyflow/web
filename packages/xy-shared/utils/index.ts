export const examplesUrl =
  process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_GIT_COMMIT_REF
    ? `https://example-apps-git-${process.env.VERCEL_GIT_COMMIT_REF}-xyflow.vercel.app`
    : process.env.NEXT_PUBLIC_EXAMPLES_URL || 'https://example-apps.xyflow.com';
