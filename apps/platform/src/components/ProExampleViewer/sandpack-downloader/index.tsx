import { Button } from '@chakra-ui/react';
import { HiOutlineDownload } from 'components/Icons';

import useSandpackDownloader from './useSandpackDownloader';

type DownloadSandpackButtonProps = {
  fileName?: string;
};

function DownloadSandpackButton({ fileName = 'react-flow-pro-example' }: DownloadSandpackButtonProps) {
  const download = useSandpackDownloader({ fileName });

  return (
    <Button leftIcon={<HiOutlineDownload />} size="sm" variant="outline" colorScheme="pink" onClick={download}>
      Download
    </Button>
  );
}

export default DownloadSandpackButton;
