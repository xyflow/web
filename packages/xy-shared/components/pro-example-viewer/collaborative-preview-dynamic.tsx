'use client';

import dynamic from 'next/dynamic';

export const CollaborativePreview = dynamic(() => import('./collaborative-preview'), {
  ssr: false,
});
