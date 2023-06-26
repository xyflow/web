import { Box, BoxProps } from '@chakra-ui/react';
import { useSandpack } from '@codesandbox/sandpack-react';

type FileLinkProps = {
  file?: string;
} & BoxProps;

const FileLink = (props: FileLinkProps) => {
  const { sandpack } = useSandpack();
  const { setActiveFile } = sandpack;

  const onClick = () => {
    if (!props.file) {
      return;
    }

    setActiveFile(props.file);
  };

  return (
    <Box
      onClick={onClick}
      color="pink.500"
      fontFamily="mono"
      fontSize="90%"
      as="span"
      cursor="pointer"
      _hover={{ color: 'gray.800' }}
      {...props}
    />
  );
};

export default FileLink;
