import { useState } from 'react';
import { Button } from '../../ui/button';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { SandpackFiles } from '@codesandbox/sandpack-react';

import { downloadExample } from '../../../server-actions/download-example';
import { Framework } from '../../../types';

const ignoreFiles = ['/config.json'];

export default function DownloadButton({
  fileName,
  files,
  exampleId,
  framework,
}: {
  fileName: string;
  files: null | SandpackFiles;
  exampleId: string;
  framework: Framework;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadZip = async () => {
    setIsDownloading(true);
    const downloadFiles = files || (await downloadExample({ exampleId, framework }));
    const zip = new JSZip();

    Object.entries(downloadFiles).map(([fileName, fileContent]) => {
      if (ignoreFiles.includes(fileName)) {
        return;
      }

      const content = typeof fileContent === 'string' ? fileContent : fileContent.code;

      zip.file(fileName.replace(/^\//, ''), content);
    });

    const content = await zip.generateAsync({ type: 'blob' });

    saveAs(content, `${fileName}.zip`);
    setIsDownloading(false);
  };

  return (
    <Button
      className="w-[160px]"
      disabled={isDownloading}
      onClick={downloadZip}
      loading={isDownloading}
      variant="default"
    >
      <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
      Download ZIP
    </Button>
  );
}
