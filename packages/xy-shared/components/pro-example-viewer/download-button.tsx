'use client';

import { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { downloadExample } from '../../server-actions/download-example';

import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';

import { Framework } from '../../types';
import { cn } from '../../lib/utils';

const ignoreFiles = ['/config.json'];

export function DownloadButton({
  slug,
  framework,
  className,
}: {
  slug: string;
  framework: Framework;
  className?: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadZip = async () => {
    setIsDownloading(true);
    const downloadFiles = await downloadExample({ exampleId: slug, framework });
    const zip = new JSZip();

    Object.entries(downloadFiles).map(([fileName, fileContent]) => {
      if (ignoreFiles.includes(fileName)) {
        return;
      }

      const content = typeof fileContent === 'string' ? fileContent : fileContent.code;

      zip.file(fileName.replace(/^\//, ''), content);
    });

    const content = await zip.generateAsync({ type: 'blob' });

    saveAs(content, `${slug}-pro-example.zip`);
    setIsDownloading(false);
  };

  return (
    <Button
      className={cn('w-[160px]', className)}
      disabled={isDownloading}
      onClick={downloadZip}
      loading={isDownloading}
      variant="default"
    >
      <ArrowDownTrayIcon className="mr-1 h-4 w-4" />
      Download ZIP
    </Button>
  );
}
