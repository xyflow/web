'use client';

import dynamic from 'next/dynamic';

export const FlowA = dynamic(
  () =>
    import('./flow-a').then((mod) => ({
      default: mod.FlowA,
    })),
  {
    ssr: false,
  },
);

export const FlowB = dynamic(
  () =>
    import('./flow-b').then((mod) => ({
      default: mod.FlowB,
    })),
  {
    ssr: false,
  },
);

export const FlowC = dynamic(
  () =>
    import('./flow-c').then((mod) => ({
      default: mod.FlowC,
    })),
  {
    ssr: false,
  },
);
