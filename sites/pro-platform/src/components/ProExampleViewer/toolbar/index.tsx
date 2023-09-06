import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { Button } from 'xy-ui';

import useSandpackDownloader from '../sandpack-downloader/useSandpackDownloader';

export default function () {
  const downloadExample = useSandpackDownloader({ fileName: 'xyflow-pro-example' });

  return (
    <div className="rounded-t-md flex gap-2 justify-end">
      <Button onClick={downloadExample} size="sm" variant="ghost">
        <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
        Download
      </Button>
      <Button asChild size="sm" variant="ghost">
        <a target="_blank" href={`https://xyflow-pro-examples.vercel.app`}>
          <ArrowTopRightOnSquareIcon className="w-5 h-5 mr-2" />
          Fullscreen
        </a>
      </Button>
    </div>
  );
}
