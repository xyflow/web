import Link from 'next/link';
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid';

export default function () {
  return (
    <Link href="/examples">
      <div className="flex items-center space-x-1 hover:text-slate-800 text-muted-foreground text-sm font-bold cursor-pointer">
        <ArrowLongLeftIcon className="h-4 w-4" />
        <div>Examples Overview</div>
      </div>
    </Link>
  );
}
