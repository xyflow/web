type PageLayoutProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function PageLayout({
  title,
  subtitle,
  children,
}: PageLayoutProps) {
  return (
    <div className="max-w-[90rem] mx-auto my-10 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
      <div className="text-center">
        {title && <h1 className="text-6xl font-black mb-4">{title}</h1>}
        {subtitle && <h2 className="text-2xl mb-8">{subtitle}</h2>}
      </div>
      {children}
    </div>
  );
}
