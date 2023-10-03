import ExampleViewer from './';
import { wideNegativeMargin } from 'xy-ui';

export type BlogExampleViewerProps = {
  codePath: string;
  additionalFiles?: string[];
  showEditor?: boolean;
  dependencies?: Record<string, string>;
  isTypescript?: boolean;
};

export function BlogExampleViewer({
  codePath,
  additionalFiles = [],
  showEditor = false,
  dependencies = {},
  isTypescript = false,
}: BlogExampleViewerProps) {
  return (
    <div className={`relative h-full mx-0 ${wideNegativeMargin}`}>
      <ExampleViewer
        codePath={codePath}
        editorHeight={'50vh'}
        sandpackOptions={{
          editorWidthPercentage: 100,
          wrapContent: false,
          readOnly: false,
        }}
        additionalFiles={additionalFiles}
        showEditor={showEditor}
        dependencies={dependencies}
        isTypescript={isTypescript}
      />
    </div>
  );
}
