'use client';

import { useState, useEffect } from 'react';
import { type SandpackFiles } from '@codesandbox/sandpack-react';

import { ProExampleConfig } from './types';
import DashboardHeader from '../DashboardHeader';
import { downloadExample } from '../../../server-actions';
import { useSubscription } from '../../../hooks';
import { type Framework } from '../../../types';

import DownloadButton from './download-button';
import OverviewButton from './overview-button';
import Tabs from './tabs';
import VariantSelect from './variant-select';

function ProExampleViewer({
  exampleId,
  framework,
  config,
}: {
  exampleId: string;
  framework: Framework;
  config: ProExampleConfig;
}) {
  const [files, setFiles] = useState<SandpackFiles | null>(null);
  const { isSubscribed } = useSubscription();
  const isUnlocked = (isSubscribed || config.free) ?? false;
  const isTemplate = config.type === 'template';

  useEffect(() => {
    downloadExample({ exampleId, framework }).then(setFiles).catch(console.error);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <OverviewButton
        label={isTemplate ? 'All Templates' : 'All Examples'}
        link={isTemplate ? '/templates' : '/examples'}
      />
      <DashboardHeader
        title={
          <>
            <div>{config.name}</div>
            <div className="ml-auto flex gap-x-2">
              <VariantSelect exampleId={exampleId} variants={config.variants} />
              {isUnlocked && (
                <DownloadButton
                  exampleId={exampleId}
                  framework={framework}
                  files={files}
                  fileName={`${exampleId}-pro-example`}
                />
              )}
            </div>
          </>
        }
        description={config.description}
        descriptionClassName="max-w-4xl"
        className="my-4"
      />
      <Tabs
        isUnlocked={isUnlocked}
        files={files}
        exampleId={exampleId}
        previewUrl={config.previewUrl}
        framework={framework}
      />
    </div>
  );
}

export default ProExampleViewer;
