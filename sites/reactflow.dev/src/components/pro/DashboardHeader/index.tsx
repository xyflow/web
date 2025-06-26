import { cn } from '@xyflow/xy-ui';
import SubscriptionPlan from './subscription-plan';

export type DashboardHeaderProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  showSubscriptionPlan?: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

export default function DashboardHeader({
  title,
  description,
  showSubscriptionPlan = false,
  className,
  titleClassName,
  descriptionClassName,
}: DashboardHeaderProps) {
  return (
    <div className={cn('my-6', className)}>
      {title && (
        <div
          className={cn(
            'flex gap-2 items-center text-3xl font-black mb-2',
            titleClassName,
          )}
        >
          {title} {showSubscriptionPlan ? <SubscriptionPlan /> : null}
        </div>
      )}
      {description && (
        <p
          className={cn(
            'text-lg text-muted-foreground max-w-2xl',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
