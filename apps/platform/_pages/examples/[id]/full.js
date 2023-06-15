import React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';

import StandaloneViewer from '../../../components/ExampleViewer/StandaloneViewer';
import examples from '../../../config/examples';

function Example() {
  const router = useRouter();
  const { id } = router.query;
  const exampleConfig = examples.find((ex) => ex.id === id);

  if (!id || !exampleConfig) {
    return null;
  }

  return (
    <Box height="calc(100vh)">
      <StandaloneViewer {...exampleConfig} />
    </Box>
  );
}

export default Example;
