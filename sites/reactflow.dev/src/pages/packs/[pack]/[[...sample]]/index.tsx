import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import fs from 'fs';
import { globSync } from 'glob';
import path from 'path';

import { PackViewer, type Sample, Musicpack } from '@xyflow/packs';
import { BaseLayout } from 'xy-shared';

const MODULE_PATH = 'node_modules/@xyflow/packs';
const PACKS = { music: Musicpack };

export const getStaticPaths = (() => {
  const paths: GetStaticPathsResult['paths'] = [];

  Object.entries(PACKS).forEach(([pack, packModule]) => {
    const packFolder = path.join(process.cwd(), MODULE_PATH, 'src/packs', pack);

    Object.keys(packModule.samples).forEach((sample) => {
      paths.push({
        params: {
          pack,
          sample: [sample.toLowerCase()],
        },
      });
    });
  });

  paths.push({
    params: {
      pack: 'music',
      sample: [],
    },
  });

  return {
    paths,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const samples: Record<string, Sample> = {};

  Object.entries(PACKS).forEach(([pack, packModule]) => {
    const packFolder = path.join(process.cwd(), MODULE_PATH, 'src/packs', pack);

    Object.entries(packModule.samples).forEach(([sample, sampleModule]) => {
      const fileNames = globSync(
        path.join(packFolder, sample.toLowerCase(), '*'),
        {
          ignore: ['**/index.tsx', '**/index.svelte'],
        },
      );

      fileNames.forEach((fileName) => {
        const file = fs.readFileSync(fileName);
        const cleanFile = file.toString().replaceAll(
          // Remove any code inside the PRUNE START and PRUNE END comments. Also remove
          // *everything* after the PRUNE comment.
          /(^ *\/\/ PRUNE START(.|\n)+? *\/\/ PRUNE END.+$)|(^ *\/\/ PRUNE(.|\n)*)/gm,
          '',
        );
        switch (path.extname(fileName)) {
          case '.tsx':
            samples[sample.toLowerCase()] = {
              react: cleanFile,
              title: sampleModule.meta.title,
              description: sampleModule.meta.description,
            };
            break;
        }
      });
    });
  });

  return {
    props: {
      pack: context.params.pack as string,
      sample: (context.params.sample as string) ?? null,
      samples,
    },
  };
}) satisfies GetStaticProps<{
  pack?: string;
  sample?: string;
  samples: Record<string, Sample>;
}>;

export default ({ pack, sample, samples }) => {
  return (
    <BaseLayout>
      <div style={{ width: '100%', height: '80vh' }}>
        <PackViewer
          flowConfig={Musicpack.flowConfig}
          initialLocation={sample ?? 'home'}
          pack={pack}
          samples={samples}
        />
      </div>
    </BaseLayout>
  );
};
