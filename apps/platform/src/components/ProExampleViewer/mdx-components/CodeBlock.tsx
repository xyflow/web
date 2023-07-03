import React from 'react';

import { SandpackCodeViewer, SandpackProvider } from '@codesandbox/sandpack-react';
import { aquaBlue } from '@codesandbox/sandpack-themes';
import { IconButton, Box, useBoolean } from '@chakra-ui/react';
import { TbCopy } from 'components/Icons';
import { MDXComponents } from 'mdx/types';

const hasCodeChild = (children: any): boolean => {
  return children?.type === 'code';
};

const CodeViewer: Exclude<MDXComponents['pre'], undefined> = (props) => {
  const [showCopy, setShowCopy] = useBoolean(false);

  if (hasCodeChild(props.children)) {
    const copyClipboard = () => {
      try {
        // @ts-ignore
        navigator.clipboard.writeText(props.children.trim());
      } catch (err) {
        console.log(err);
      }
    };

    // @ts-ignore
    const codeString = props.children.props.children;

    return (
      <Box onMouseEnter={setShowCopy.on} onMouseLeave={setShowCopy.off} mb={6} position="relative">
        <SandpackProvider
          theme={aquaBlue}
          customSetup={{ entry: 'index.ts' }}
          files={{ 'index.ts': codeString.trim() }}
        >
          {showCopy && (
            <IconButton
              onClick={copyClipboard}
              position="absolute"
              zIndex="10"
              size="sm"
              top="10px"
              right="10px"
              icon={<TbCopy />}
              aria-label="copy code to clipboard"
            />
          )}
          <SandpackCodeViewer wrapContent={false} />
        </SandpackProvider>
      </Box>
    );
  }

  return null;
};

export default CodeViewer;
