import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Box } from '@chakra-ui/react';
import { Leva, useControls } from 'leva';

function StandaloneViewer({ id, levaConfig = {} }) {
  const levaProps = useControls(levaConfig);
  const Example = useMemo(() => dynamic(() => import(`../../examples/${id}/App.tsx`)), [id]);

  return (
    <Box height="100%" position="relative">
      <Box position="absolute" maxWidth={300} minWidth={250} top={15} right={15} zIndex={1100}>
        <Leva hideCopyButton titleBar={false} fill />
      </Box>
      <Example key={id} {...levaProps} />
    </Box>
  );
}

export default StandaloneViewer;
