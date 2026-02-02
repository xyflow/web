'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import ProExampleViewer from './pro-example-viewer';
import { randomUUID } from 'crypto';



export const makeParams = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const flowId = searchParams.get('flow');
    if (flowId) {
        return flowId;
    }
    const newFlowId = randomUUID();
    router.push(`?flow=${newFlowId}`);
    return newFlowId;
};


/**
 * This component is used to wrap the pro example viewer to display a
 * side-by-side viewer for the collaborative example. We wrap the component in a
 * client component to be able to inject the query parameter `flow` into the
 * URL, so we can tell users to copy-paste the URL to another tab to see the
 * changes. 
*/
export default function CollaborativeFlowViewer() {
    const flowId = makeParams();
    console.log(flowId);
    return <ProExampleViewer slug="collaborative" sideBySide={true} queryParams={{ flow: flowId }} />
}