import { Button } from 'xy-ui';

import useSandpackDownloader from './useSandpackDownloader';

type DownloadSandpackButtonProps = {
  fileName?: string;
};

function DownloadSandpackButton({ fileName = 'react-flow-pro-example' }: DownloadSandpackButtonProps) {
  const download = useSandpackDownloader({ fileName });

  return (
    <Button size="sm" variant="react" onClick={download}>
      Download
    </Button>
  );
}

export default DownloadSandpackButton;
