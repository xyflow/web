import { Framework } from '@/types';

import ReactExample from './react-example';
import SvelteExample from './svelte-example';
import { CodeViewerOptions } from './example-viewer';

const defaultOptions: CodeViewerOptions = {
  editorHeight: '70vh',
  editorWidthPercentage: 45,
  wrapContent: true,
  readOnly: false,
};

type CodeViewerProps = {
  codePath: string;
  additionalFiles?: string[];
  dependencies?: Record<string, string>;
  options?: CodeViewerOptions;
  activeFile?: string;
  showEditor?: boolean;
  showPreview?: boolean;
  isTypescript?: boolean;
  customPreview?: React.ReactNode;
  sandpackOptions?: Record<string, any>;
  showOpenInCodeSandbox?: boolean;
  framework?: Framework;
};

export default function CodeViewer({
  codePath,
  additionalFiles = [],
  options = defaultOptions,
  activeFile = null,
  isTypescript = false,
  framework = 'react',
  ...rest
}: CodeViewerProps) {
  const optionsMerged = {
    ...defaultOptions,
    ...options,
  };

  console.log(optionsMerged);

  return (
    <>
      {framework === 'react' && (
        <ReactExample
          codePath={codePath}
          isTypescript={isTypescript}
          framework={framework}
          additionalFiles={additionalFiles}
          options={optionsMerged}
          {...rest}
        />
      )}
      {framework === 'svelte' && (
        <SvelteExample
          codePath={codePath}
          framework={framework}
          options={optionsMerged}
          {...rest}
        />
      )}
    </>
  );
}
