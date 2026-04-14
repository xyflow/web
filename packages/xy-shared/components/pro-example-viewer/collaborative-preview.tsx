'use client';

import { useState } from 'react';

export default function CollaborativePreview({ iframeSrc }: { iframeSrc: string }) {
  const [flowId] = useState<string | undefined>(() => {
    if (typeof window === 'undefined') return undefined;
    const key = 'collab-flow-tab-session-id';
    let existing = window.sessionStorage.getItem(key);

    if (!existing) {
      existing = crypto.randomUUID();
      window.sessionStorage.setItem(key, existing);
    }

    return existing;
  });

  return (
    <div className="flex gap-2">
      <div className="h-[645px] w-1/2">
        {flowId && (
          <iframe
            src={`${iframeSrc}?flow=${flowId}`}
            className="block h-full w-full bg-white"
            allow="clipboard-write"
          />
        )}
      </div>
      <div className="h-[645px] w-1/2 border-l-2 border-l-gray-200">
        {flowId && (
          <iframe
            src={`${iframeSrc}?flow=${flowId}`}
            className="block h-full w-full bg-white"
            allow="clipboard-write"
          />
        )}
      </div>
    </div>
  );
}
