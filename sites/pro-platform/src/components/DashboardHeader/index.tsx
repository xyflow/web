import SubscriptionPlan from './subscription-plan';

export type DashboardHeaderProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  showSubscriptionPlan?: boolean;
};

export default function ({ title, description, showSubscriptionPlan = false }: DashboardHeaderProps) {
  return (
    <div className="my-6">
      {title && (
        <div className="flex gap-2 items-center text-3xl font-black mb-2">
          {title} {showSubscriptionPlan ? <SubscriptionPlan /> : null}
        </div>
      )}
      {description && <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>}
    </div>
  );
}
