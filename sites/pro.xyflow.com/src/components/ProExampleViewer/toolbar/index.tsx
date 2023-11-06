import { ArrowDownTrayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';
import { Button } from '@xyflow/xy-ui';

import useSandpackDownloader from '../sandpack-downloader/useSandpackDownloader';

type ToolbarProps = {
  exampleId: string;
};

export default function ExampleViewerToolbar({ exampleId }: ToolbarProps) {
  const downloadExample = useSandpackDownloader({ fileName: `${exampleId}-example` });

  return (
    <div className="rounded-t-md flex gap-2 justify-end">
      <Button onClick={downloadExample} size="sm" variant="ghost">
        <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
        Download
      </Button>
      <Button asChild size="sm" variant="ghost">
        {/* @todo adjust the url to match the current framework (react, svelte, ...) */}
        <a target="_blank" href={`https://xyflow-react-pro-examples.vercel.app/${exampleId}`}>
          <ArrowTopRightOnSquareIcon className="w-5 h-5 mr-2" />
          Fullscreen
        </a>
      </Button>
    </div>
  );
}
