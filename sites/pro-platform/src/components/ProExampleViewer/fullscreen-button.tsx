import { Button } from 'xy-ui';

type FullScreenButtonProps = {
  exampleId: string;
};

function FullScreenButton({ exampleId }: FullScreenButtonProps) {
  return (
    <a target="_blank" href={`https://xyflow-pro-examples.vercel.app/${exampleId}`}>
      <Button size="sm" variant="react">
        Fullscreen
      </Button>
    </a>
  );
}

export default FullScreenButton;
