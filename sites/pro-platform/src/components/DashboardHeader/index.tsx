export type DashboardHeaderProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
};

export default function ({ title, description }: DashboardHeaderProps) {
  return (
    <div className="my-6">
      {title && <h2 className="text-3xl font-black mb-2">{title}</h2>}
      {description && <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>}
    </div>
  );
}
