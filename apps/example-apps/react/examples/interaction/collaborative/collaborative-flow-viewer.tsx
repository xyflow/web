'use client';
import { randomUUID } from 'crypto';

function uid128() {
    const b = new Uint8Array(16);
    crypto.getRandomValues(b);
    return btoa(String.fromCharCode(...b))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export const makeParams = () => {

    // const existingFlowId = new URLSearchParams(window.location.search).get('flow');
    // if (existingFlowId) {
    // return existingFlowId;
    // }
    const flowId = uid128();
    window.history.replaceState(null, '', `?flow=${flowId}`);
    return flowId;
};


export const CollaborativeFlowViewer = () => {
    const flowId = makeParams();
    console.log(flowId);
    return <div className="flex">
        <iframe src={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/collaborative-new?flow=${flowId}`} className="block h-[645px] bg-white w-1/2" />
        <iframe src={`${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/collaborative-new?flow=${flowId}`} className="block h-[645px] bg-white w-1/2" />
    </div>
};