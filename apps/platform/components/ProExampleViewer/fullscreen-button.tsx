import { Button } from '@chakra-ui/react';
import { HiOutlineExternalLink } from 'components/Icons';

type FullScreenButtonProps = {
  exampleId: string;
};

function FullScreenButton({ exampleId }: FullScreenButtonProps) {
  return (
    <a target="_blank" href={`https://xyflow-pro-examples.vercel.app/${exampleId}`}>
      <Button leftIcon={<HiOutlineExternalLink />} size="sm" variant="outline" colorScheme="pink">
        Fullscreen
      </Button>
    </a>
  );
}

export default FullScreenButton;
