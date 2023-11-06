export default function ({
  path,
  className,
}: {
  path: string;
  className?: string;
}) {
  const fullPath = process.env.NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID
    ? `xyflow-svelte-examples-git-${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF}-${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}.vercel.app`
    : `${process.env.NEXT_PUBLIC_SVELTE_EXAMPLES_URL}${path}`;
  return (
    <iframe
      src={fullPath}
      loading="lazy"
      width="100%"
      height="100%"
      className={className}
    />
  );
}
