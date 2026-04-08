import { cn } from '../../../lib/utils';
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
            'align-center mb-2 flex items-center gap-2 text-3xl font-black',
            titleClassName,
          )}
        >
          {title} {showSubscriptionPlan ? <SubscriptionPlan /> : null}
        </div>
      )}
      {description && (
        <p
          className={cn('text-muted-foreground max-w-2xl text-lg', descriptionClassName)}
        >
          {description}
        </p>
      )}
    </div>
  );
}
