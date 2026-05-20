export async function NoAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full min-h-[70vh]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[70vh] w-full -translate-x-1/2 -translate-y-1/2 opacity-10 dark:hidden"
        style={{
          background:
            'radial-gradient(hsl(var(--primary) / 0.8) 0%, hsl(var(--primary) / 0.45) 25%, rgba(255,255,255,1) 50%)',
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-[70vh] w-full -translate-x-1/2 -translate-y-1/2 opacity-10 dark:block"
        style={{
          background:
            'radial-gradient(hsl(var(--primary) / 0.8) 0%, hsl(var(--primary) / 0.45) 25%, rgba(15,23,42,1) 50%)',
        }}
      />
      <div className="mx-auto mb-20 max-w-6xl pt-10">{children}</div>
    </div>
  );
}
