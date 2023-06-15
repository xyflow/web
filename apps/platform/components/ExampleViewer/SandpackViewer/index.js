import React, { useEffect, useState, useMemo } from 'react';
import { Button, Flex, Wrap, Box, Link, useBreakpointValue } from '@chakra-ui/react';
import { SandpackProvider, SandpackCodeEditor, SandpackPreview } from '@codesandbox/sandpack-react';
import { aquaBlue } from '@codesandbox/sandpack-themes';
import { HiOutlineDownload, HiOutlineExternalLink } from 'components/Icons';
import NextLink from 'next/link';
import { Resizable } from 're-resizable';

import { PageLoader } from '../../Loader';
import { isDevelopment } from '../../../utils/browser';
import Heading from '../../Heading';
import Text from '../../Text';
import MarkdownContent from './MarkdownContent';
import useSandpackDownloader from '../SandpackDownloader';
import { useIsSubscribed } from '../../../context/subscription';
import StandaloneViewer from '../StandaloneViewer';

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

const defaultOptions = {
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

function DownloadButton({ exampleId }) {
  const download = useSandpackDownloader({ fileName: `${exampleId}-example` });

  return (
    <Button leftIcon={<HiOutlineDownload />} size="sm" variant="outline" colorScheme="pink" onClick={download}>
      Download
    </Button>
  );
}

function FullScreenButton({ exampleId }) {
  return (
    <NextLink href={`/examples/${exampleId}/full`}>
      <Button leftIcon={<HiOutlineExternalLink />} size="sm" variant="outline" colorScheme="pink">
        Fullscreen
      </Button>
    </NextLink>
  );
}

function Variants({ exampleId, variants = [] }) {
  return variants.map((variant) => {
    const isActive = exampleId === variant.id;

    return (
      <NextLink key={variant.id} href={`/examples/${variant.id}`}>
        <Button size="sm" variant={isActive ? 'solid' : 'outline'} colorScheme="pink" isActive={isActive}>
          {variant.label}
        </Button>
      </NextLink>
    );
  });
}

function ExampleHeader({ name, description }) {
  return (
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
      <Heading
        fontSize={['3xl', '4xl', '4xl', '5xl']}
        as="h1"
        mb={2}
        style={{
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {name}
      </Heading>
      <Text color="gray.800" lineHeight="1.4" fontSize="xl" mb={0}>
        {description}
      </Text>
    </>
  );
}

function ExampleViewer({
  exampleId,
  files = [],
  dependencies = {},
  options = defaultOptions,
  activeFile = null,
  isReadOnly = false,
  name = '',
  description = '',
  mdxSource = null,
  variants = [],
  levaConfig = {},
}) {
  const [loadedFiles, setLoadedFiles] = useState(null);
  const isSubscribed = useIsSubscribed();

  useEffect(() => {
    const loadFiles = async () => {
      const fls = {};

      for (let fileName of files) {
        const file = await import(`!raw-loader!../../../examples/${exampleId}/${fileName}`);

        fls[`/${fileName}`] = { code: file.default };

        if (fileName === activeFile) {
          fls[`/${fileName}`].active = true;
        }
      }

      setLoadedFiles(fls);
    };

    loadFiles();
  }, [exampleId, files, activeFile]);

  const customSetup = useMemo(
    () => ({
      ...defaultSetup,
      dependencies: {
        ...defaultSetup.dependencies,
        ...dependencies,
      },
    }),
    [dependencies]
  );

  const editorHeight = options?.editorHeight || 800;

  const isLargeScreen = useBreakpointValue({ base: false, xl: true });
  const textDefaultWidth = isLargeScreen ? '1000px' : '55%';

  if (!isSubscribed) {
    return (
      <Box sx={{ WebkitFontSmoothing: 'auto' }}>
        <Box maxWidth="900px" mb={5}>
          <ExampleHeader name={name} description={description} />
        </Box>
        <Box h="800">
          <StandaloneViewer id={exampleId} levaConfig={levaConfig} />
        </Box>
      </Box>
    );
  }

  if (!loadedFiles) {
    return <PageLoader height={editorHeight} />;
  }

  return (
    <SandpackProvider
      template="react-ts"
      customSetup={customSetup}
      files={{ ...loadedFiles, ...hiddenBaseStyles }}
      options={{ editorHeight }}
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
          <ExampleHeader name={name} description={description} />
          <Flex justifyContent="space-between" mt={4} mb={10}>
            <Wrap>
              <DownloadButton exampleId={exampleId} />
              <FullScreenButton exampleId={exampleId} />
            </Wrap>
            <Wrap>
              <Variants exampleId={exampleId} variants={variants} />
            </Wrap>
          </Flex>
          <Box>
            <MarkdownContent mdxSource={mdxSource} />
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
          flexGrow
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
            {...options}
            readOnly={isReadOnly}
          />
        </Flex>
      </Flex>
    </SandpackProvider>
  );
}

export default ExampleViewer;
