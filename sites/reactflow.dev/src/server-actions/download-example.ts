'use server';

import { SandpackFiles } from '@codesandbox/sandpack-react';
import { callNhostFunction } from './call-nhost-function';

type UseDownloadProExampleOptions = {
  exampleId?: string;
  framework?: string;
  ignoreFiles?: string[];
};

export async function downloadExample({
  exampleId,
  framework,
  ignoreFiles = [],
}: UseDownloadProExampleOptions = {}): Promise<SandpackFiles> {
  const data = await callNhostFunction('/pro-examples/download', {
    id: exampleId,
    framework,
  });

  const sandpackFiles = data.files?.reduce((acc, file) => {
    if (ignoreFiles.includes(file.path)) {
      return acc;
    }

    return {
      ...acc,
      [file.path]: {
        code: file.content,
      },
    };
  }, {});

  return sandpackFiles;
}
