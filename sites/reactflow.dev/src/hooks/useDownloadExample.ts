import { useCallback } from 'react';
import { SandpackFiles } from '@codesandbox/sandpack-react';
import { callNhostFunction } from '@/server-actions';

export type UseDownloadProExampleOptions = {
  exampleId?: string;
  framework?: string;
  ignoreFiles?: string[];
};

function useDownloadExample({
  exampleId,
  framework,
  ignoreFiles = [],
}: UseDownloadProExampleOptions = {}) {
  const fetchExample = useCallback(async (): Promise<SandpackFiles> => {
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
  }, [exampleId, framework, ignoreFiles]);

  return fetchExample;
}

export default useDownloadExample;
