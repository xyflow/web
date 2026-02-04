'use client';
import ProExampleViewer from './pro-example-viewer';
import { Button, Link } from '@xyflow/xy-ui';
import { useState } from 'react';

/**
 * This component is used to wrap the pro example viewer to display a
 * side-by-side viewer for the collaborative example with a random flow id (generated on the server).
 */
export default function CollaborativeFlowViewer() {
  const [flowId] = useState(() => crypto.randomUUID());

  return (
    <div className="flex flex-col gap-4 pt-4">
      <Button asChild className="shrink-0 max-w-64">
        <Link
          href={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/react/collaborative?flow=${flowId}`}
          target="_blank"
        >
          Open the flow in a new tab!
        </Link>
      </Button>
      <ProExampleViewer slug="collaborative" sideBySide queryParams={{ flow: flowId }} />
    </div>
  );
}
