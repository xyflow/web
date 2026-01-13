'use server';

import { SandpackFiles } from '@codesandbox/sandpack-react';
import { z } from 'zod';
import { callNhostFunction } from './call-nhost-function';

type UseDownloadProExampleOptions = {
  exampleId?: string;
  framework?: string;
  ignoreFiles?: string[];
};

const DownloadResponseSchema = z.object({
  timestamp: z.number(),
  files: z
    .array(
      z.object({
        path: z.string(),
        content: z.string(),
      }),
    )
    .optional(),
});

export async function downloadExample({
  exampleId,
  framework,
  ignoreFiles = [],
}: UseDownloadProExampleOptions = {}): Promise<SandpackFiles> {
  const data = await callNhostFunction('/pro-examples/download', {
    id: exampleId,
    framework,
  });

  const parsedData = DownloadResponseSchema.parse(data);

  const sandpackFiles = parsedData.files?.reduce(
    (acc: SandpackFiles, file: { path: string; content: string }) => {
      if (ignoreFiles.includes(file.path)) {
        return acc;
      }

      return {
        ...acc,
        [file.path]: {
          code: file.content,
        },
      };
    },
    {} as SandpackFiles,
  );

  return sandpackFiles ?? {};
}
