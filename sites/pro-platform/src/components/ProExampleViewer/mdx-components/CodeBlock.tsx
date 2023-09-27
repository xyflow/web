import React from 'react';

import { SandpackCodeViewer, SandpackProvider } from '@codesandbox/sandpack-react';
import { aquaBlue } from '@codesandbox/sandpack-themes';
import { MDXComponents } from 'mdx/types';
import { Button } from 'xy-ui';

const hasCodeChild = (children: any): boolean => {
  return children?.type === 'code';
};

const CodeViewer: Exclude<MDXComponents['pre'], undefined> = (props) => {
  if (hasCodeChild(props.children)) {
    // @ts-ignore
    const codeString = props.children.props.children;

    const copyClipboard = () => {
      try {
        // @ts-ignore
        navigator.clipboard.writeText(codeString);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div className="relative group">
        <SandpackProvider
          theme={aquaBlue}
          customSetup={{ entry: 'index.ts' }}
          files={{ 'index.ts': codeString.trim() }}
        >
          <Button
            className="bg-white absolute top-2 right-2 z-20 group-hover:block hidden"
            onClick={copyClipboard}
            size="sm"
            aria-label="copy code to clipboard"
            variant="outline"
          >
            copy
          </Button>
          <SandpackCodeViewer wrapContent={false} />
        </SandpackProvider>
      </div>
    );
  }

  return null;
};

export default CodeViewer;
