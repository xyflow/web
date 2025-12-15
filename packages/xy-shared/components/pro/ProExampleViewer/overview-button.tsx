import Link from 'next/link';
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid';

export default function OverviewButton({
  link = '/examples',
  label = 'All Examples',
}: {
  link?: string;
  label?: React.ReactNode;
}) {
  return (
    <Link href={link}>
      <div className="flex items-center space-x-1 hover:text-slate-800 text-muted-foreground text-sm font-bold cursor-pointer">
        <ArrowLongLeftIcon className="h-4 w-4" />
        <div>{label}</div>
      </div>
    </Link>
  );
}
