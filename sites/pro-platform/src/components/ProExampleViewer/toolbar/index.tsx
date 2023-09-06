import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { Button } from 'xy-ui';

export default function () {
  return (
    <div className="rounded-t-md flex gap-2 justify-end">
      <Button size="sm" variant="ghost">
        <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
        Download
      </Button>
      <Button size="sm" variant="ghost">
        <ArrowTopRightOnSquareIcon className="w-5 h-5 mr-2" />
        Fullscreen
      </Button>
    </div>
  );
}
