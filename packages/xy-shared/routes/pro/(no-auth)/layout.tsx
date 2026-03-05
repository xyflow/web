export async function NoAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full min-h-[70vh]">
      <div
        className="absolute opacity-10 w-full h-[70vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(rgba(68,91,222,1) 0%, rgba(215,78,243,1) 25%, rgba(255,255,255,1) 50%)',
        }}
      />
      <div className="max-w-6xl mx-auto pt-10 mb-20">{children}</div>
    </div>
  );
}
