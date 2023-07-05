'use client';

import { useMemo } from 'react';
import { Flex, Wrap, Box, Link, useBreakpointValue, Heading, Text } from '@chakra-ui/react';
import { Resizable } from 're-resizable';
import { aquaBlue } from '@codesandbox/sandpack-themes';
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackOptions,
  SandpackSetup,
  SandpackFiles,
} from '@codesandbox/sandpack-react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

import { isDevelopment } from 'utils/browser';

import mdxComponents from './mdx-components';
import DownloadSandpackButton from './sandpack-downloader';
import FullScreenButton from './fullscreen-button';

export type ProCodeViewerProps = {
  exampleId: string;
  files: SandpackFiles;
  title?: string;
  description?: string;
  dependencies?: SandpackSetup['dependencies'];
  sandpackOptions?: SandpackOptions;
  readme: MDXRemoteSerializeResult;
};

const hiddenBaseStyles = {
  '/styles.css': {
    code: `
html, body, #root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
`,
    hidden: true,
  },
};

const defaultSetup = {
  dependencies: {
    reactflow: '11.4.0',
  },
};

const defaultSandpackOptions = {
  editorHeight: 800,
  editorWidthPercentage: 45,
  wrapContent: false,
};

const resizeRightEnabled = {
  top: false,
  right: true,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

const resizeBottomEnabled = {
  top: false,
  right: false,
  bottom: true,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

export default function ProCodeViewer({
  title,
  description,
  exampleId,
  files,
  readme,
  dependencies,
  sandpackOptions,
}: ProCodeViewerProps) {
  const customSandpackOptions = useMemo(
    () => ({
      ...defaultSandpackOptions,
      ...sandpackOptions,
    }),
    []
  );

  const customSetup = useMemo(
    () => ({
      ...defaultSetup,
      dependencies: {
        ...defaultSetup.dependencies,
        ...dependencies,
      },
    }),
    []
  );

  const isLargeScreen = useBreakpointValue({ base: false, xl: true });
  const textDefaultWidth = isLargeScreen ? '1000px' : '55%';

  return (
    <SandpackProvider
      template="react-ts"
      customSetup={customSetup}
      files={{ ...files, ...hiddenBaseStyles }}
      options={customSandpackOptions}
      theme={aquaBlue}
    >
      <Flex sx={{ WebkitFontSmoothing: 'auto' }} position="relative">
        <Resizable
          defaultSize={{
            width: textDefaultWidth,
            height: '100%',
          }}
          style={{
            paddingTop: 'var(--chakra-space-6)',
            paddingRight: 'var(--chakra-space-4)',
          }}
          maxWidth="90%"
          minWidth="10%"
          enable={resizeRightEnabled}
        >
          <>
            <Heading
              letterSpacing="1px"
              color="gray.500"
              textTransform="uppercase"
              fontSize="sm"
              as="span"
              style={{
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              Pro Example
            </Heading>
            {title && (
              <Heading
                fontSize={['3xl', '4xl', '4xl', '5xl']}
                as="h1"
                mb={2}
                style={{
                  WebkitFontSmoothing: 'antialiased',
                }}
              >
                {title}
              </Heading>
            )}
            {description && (
              <Text color="gray.800" lineHeight="1.4" fontSize="xl" mb={0}>
                {description}
              </Text>
            )}
          </>
          <Flex justifyContent="space-between" mt={4} mb={10}>
            <Wrap>
              <DownloadSandpackButton fileName={`${exampleId}-example`} />
              <FullScreenButton exampleId={exampleId} />
            </Wrap>
            <Wrap>{/* <Variants exampleId={exampleId} variants={variants} /> */}</Wrap>
          </Flex>
          <Box>
            <MDXRemote {...readme} components={mdxComponents} />
          </Box>
          <Box borderTop="1px solid" borderTopColor="gray.100">
            <Heading fontSize="2xl" mt={4}>
              Feedback
            </Heading>
            <Text color="gray.800" lineHeight="1.4" fontSize="md" mt={4}>
              We are always trying to improve the quality of the Pro examples and would be happy about your feedback.
              Feel free to reach out at{' '}
              <Link color="pink.500" href="mailto:info@reactflow.dev">
                info@reactflow.dev
              </Link>
              .
            </Text>
          </Box>
        </Resizable>
        <Flex
          flexGrow={1}
          top={0}
          height="100vh"
          overflow="hidden"
          position="sticky"
          borderLeft="1px solid white"
          borderColor="gray.100"
          flexDir="column"
          width="100%"
        >
          <Resizable
            defaultSize={{
              width: '100%',
              height: '50%',
            }}
            enable={resizeBottomEnabled}
            maxHeight="90%"
            minHeight="10%"
          >
            <Box h="100%" sx={{ '>div': { height: '100%' } }}>
              <SandpackPreview showOpenInCodeSandbox={isDevelopment()} />
            </Box>
          </Resizable>
          <SandpackCodeEditor
            showRunButton={false}
            style={{ flexGrow: 1, height: '50%' }}
            {...customSandpackOptions}
            // @todo re-enable this
            // readOnly={isReadOnly}
          />
        </Flex>
      </Flex>
    </SandpackProvider>
  );
}
