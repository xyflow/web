'use server';

import { SandpackFiles } from '@codesandbox/sandpack-react';
import { z } from 'zod';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

type UseDownloadProExampleOptions = {
  exampleId?: string;
  framework?: string;
  ignoreFiles?: string[];
};

const ProExampleSchema = z
  .array(
    z.object({
      config: z.object({
        name: z.string(),
        description: z.string(),
        framework: z.string(),
      }),
      files: z.array(
        z.object({
          path: z.string(),
          content: z.string(),
        }),
      ),
    }),
  )
  .min(1)
  .max(1);

export async function fetchProExample({
  exampleId,
  framework,
  ignoreFiles = [],
}: UseDownloadProExampleOptions = {}): Promise<SandpackFiles> {
  const redisKey = `@${framework}flow-pro/${exampleId}`;
  const data = await redis.json.get(redisKey, '$');

  if (!data) {
    throw new Error('Example does not exist.');
  }

  const parsedData = ProExampleSchema.parse(data)[0];

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
