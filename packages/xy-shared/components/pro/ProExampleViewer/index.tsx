// import { useState, useEffect } from 'react';
import { Tabs } from 'nextra/components';
import { type SandpackFiles } from '@codesandbox/sandpack-react';

import { ProExampleConfig } from './types';
import DashboardHeader from '../DashboardHeader';
// import { downloadExample } from '../../../server-actions/download-example';
import { type Framework } from '../../../types';

import DownloadButton from './download-button';
// import Tabs from './tabs';
import VariantSelect from './variant-select';

import PreviewTab from './tabs/preview';
import EditorTab from './tabs/editor';

// import { MDXRemote } from 'nextra/mdx-remote';

function ProExampleViewer({
  exampleId,
  framework,
  config,
  files,
  markdown,
}: {
  exampleId: string;
  framework: Framework;
  config: ProExampleConfig;
  files: SandpackFiles;
  markdown: string;
}) {
  // const [files, setFiles] = useState<SandpackFiles | null>(null);

  // useEffect(() => {
  //   downloadExample({ exampleId, framework }).then(setFiles).catch(console.error);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <DashboardHeader
        title={
          <>
            <div>{config.name}</div>
            <div className="ml-auto flex gap-x-2">
              <VariantSelect exampleId={exampleId} variants={config.variants} />
              <DownloadButton
                exampleId={exampleId}
                framework={framework}
                files={files}
                fileName={`${exampleId}-pro-example`}
              />
            </div>
          </>
        }
        description={config.description}
        descriptionClassName="max-w-4xl"
        className="my-4"
      />
      {/* <Tabs files={files} previewUrl={config.previewUrl} markdown={markdown} /> */}

      <Tabs items={['Preview', 'Code', 'Readme']}>
        <Tabs.Tab>
          <PreviewTab iframePreviewUrl={config.previewUrl} />
        </Tabs.Tab>
        <Tabs.Tab>
          <EditorTab files={files} />
        </Tabs.Tab>
        <Tabs.Tab>{/* <MDXRemote compiledSource={markdown} /> */}</Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default ProExampleViewer;
