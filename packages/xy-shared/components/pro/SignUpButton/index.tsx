import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';
import { Link } from '../../ui/link';
import { SparklesIcon } from '@heroicons/react/24/outline';

export function SignUpButton({
  showIcon = false,
  description = 'to get a free pro example',
  className,
}: {
  showIcon?: boolean;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex gap-2 items-center flex-wrap w-full md:w-auto', className)}>
      <Button asChild size="lg" variant="pro" className="w-full md:w-auto">
        <Link href="/pro/sign-up">
          {showIcon && <SparklesIcon className="w-5 h-5 mr-2" />}Sign Up
        </Link>
      </Button>
      <span className="text-sm mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#FA3C92] to-[#969696]">
        {description}
      </span>
    </div>
  );
}
