import { Framework } from '@/types';

import ReactExample from './react-example';
import SvelteExample from './svelte-example';

const defaultOptions = {
  editorHeight: '70vh',
  editorWidthPercentage: 45,
  wrapContent: true,
  readOnly: false,
};

type CodeViewerProps = {
  codePath: string;
  additionalFiles?: string[];
  dependencies?: Record<string, string>;
  options?: typeof defaultOptions;
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
  const editorHeight = options?.editorHeight || defaultOptions.editorHeight;

  return (
    <>
      {framework === 'react' && (
        <ReactExample
          codePath={codePath}
          isTypescript={isTypescript}
          framework={framework}
          editorHeight={editorHeight}
          additionalFiles={additionalFiles}
          {...rest}
        />
      )}
      {framework === 'svelte' && (
        <SvelteExample
          codePath={codePath}
          framework={framework}
          editorHeight={editorHeight}
          {...rest}
        />
      )}
    </>
  );
}
