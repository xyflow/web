import { Button } from '../../../ui/button';

function ProExamplePreview({ iframePreviewUrl }: { iframePreviewUrl: string }) {
  return (
    <>
      <div className="mb-2relative border-border mt-4 h-[75vh] max-h-[650px] min-h-[400px] overflow-hidden rounded-sm border">
        <iframe className="h-full w-full" src={iframePreviewUrl} />
      </div>
      <a target="_blank" rel="noreferrer" href={iframePreviewUrl}>
        <Button variant="link">Open preview in a new tab</Button>
      </a>
    </>
  );
}

export default ProExamplePreview;
