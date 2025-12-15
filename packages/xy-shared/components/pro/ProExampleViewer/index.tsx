'use client';

import { useState, useEffect } from 'react';
import { type SandpackFiles } from '@codesandbox/sandpack-react';

import { Framework, ProExampleConfig } from './types';
import DashboardHeader from '../DashboardHeader';
import { downloadExample } from '../../../server-actions';
import { useSubscription } from '../../../hooks';

import DownloadButton from './download-button';
import OverviewButton from './overview-button';
import Tabs from './tabs';
import VariantSelect from './variant-select';

function ProExampleViewer({
  exampleId,
  frameworkId,
  config,
}: {
  exampleId: string;
  frameworkId: Framework;
  config: ProExampleConfig;
}) {
  const [files, setFiles] = useState<SandpackFiles | null>(null);
  const { isSubscribed } = useSubscription();
  const isUnlocked = (isSubscribed || config.free) ?? false;
  const isTemplate = config.type === 'template';

  useEffect(() => {
    downloadExample({ exampleId, framework: frameworkId })
      .then(setFiles)
      .catch(console.error);
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
                  frameworkId={frameworkId}
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
      />
    </div>
  );
}

export default ProExampleViewer;
