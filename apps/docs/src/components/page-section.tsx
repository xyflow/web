import cn from 'clsx';

type PageSectionProps = {
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
};

export default function PageSection({
  title,
  subtitle,
  children,
  className,
}: PageSectionProps) {
  return (
    <div className={cn('py-10', className)}>
      <div
        className={
          'mx-auto max-w-[90rem] pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]'
        }
      >
        <div className="text-center">
          {title && <h1 className="text-6xl font-black mb-4">{title}</h1>}
          {subtitle && <h2 className="text-2xl mb-8">{subtitle}</h2>}
        </div>
        {children}
      </div>
    </div>
  );
}
