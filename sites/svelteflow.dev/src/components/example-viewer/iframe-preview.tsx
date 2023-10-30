export default function ({
  path,
  className,
}: {
  path: string;
  className?: string;
}) {
  return (
    <iframe
      src={`${process.env.NEXT_PUBLIC_SVELTE_EXAMPLES_URL}${path}`}
      loading="lazy"
      width="100%"
      height="100%"
      className={className}
    />
  );
}
