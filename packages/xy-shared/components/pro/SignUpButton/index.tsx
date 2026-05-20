import { SparklesIcon } from '@heroicons/react/24/outline';

import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';
import { Link } from '../../ui/link';
import { getSubscriptionStatus } from '../../../server-actions/get-subscription';

export async function SignUpButton({
  showIcon = false,
  description = 'to get a free pro example',
  className,
}: {
  showIcon?: boolean;
  description?: string;
  className?: string;
}) {
  const { user, isSubscribed } = await getSubscriptionStatus();
  const hasUser = !!user;
  const showDescription = !hasUser || (hasUser && !isSubscribed);
  const buttonLink = hasUser
    ? isSubscribed
      ? '/pro/dashboard'
      : '/pro/subscribe'
    : '/pro/sign-up';

  const buttonLabel = hasUser ? (isSubscribed ? 'Dashboard' : 'Subscribe') : 'Sign Up';

  return (
    <div className={cn('flex w-full flex-wrap items-center gap-2 md:w-auto', className)}>
      <Button asChild size="lg" variant="pro" className="w-full md:w-auto">
        <Link href={buttonLink} className="hover:no-underline">
          {showIcon && <SparklesIcon className="mr-2 h-5 w-5" />}
          {buttonLabel}
        </Link>
      </Button>
      {showDescription && (
        <span className="from-primary to-muted-foreground mx-auto bg-gradient-to-r bg-clip-text text-sm text-transparent">
          {description}
        </span>
      )}
    </div>
  );
}
