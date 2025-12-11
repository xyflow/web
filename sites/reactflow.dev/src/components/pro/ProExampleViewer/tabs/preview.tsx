import { Button } from 'xy-shared';

function ProExamplePreview({ iframePreviewUrl }: { iframePreviewUrl: string }) {
  return (
    <>
      <div className="mt-4 mb-2relative min-h-[400px] h-[75vh] max-h-[650px] rounded-sm overflow-hidden border border-gray-200">
        <iframe className="w-full h-full" src={iframePreviewUrl} />
      </div>
      <a target="_blank" rel="noreferrer" href={iframePreviewUrl}>
        <Button variant="link">Open preview in a new tab</Button>
      </a>
    </>
  );
}

export default ProExamplePreview;
