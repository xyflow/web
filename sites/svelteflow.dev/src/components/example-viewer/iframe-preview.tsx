export default function ({
  path,
  className,
}: {
  path: string;
  className?: string;
}) {
  const fullPath = process.env.NEXT_PUBLIC_VERCEL_GIT_PULL_REQUEST_ID
    ? `https://xyflow-svelte-examples-git-${process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF}-xyflow.vercel.app/${path}`
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
