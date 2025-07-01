'use client';

import { useState } from 'react';

export function ActionBar({ children, editor }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`flex px-2 py-2 gap-2 text-sm justify-end border-t ${isOpen ? 'border-b' : ''} 
      border-gray-200 [&>button]:px-2 [&>button]:border-gray-200 [&>button]:border [&>button]:py-1 [&>button]:rounded-lg [&>button:hover]:bg-gray-100`}
      >
        {children}
        {/* <span className="border-l border-gray-200"></span> */}
        <button
          className={isOpen ? '' : 'text-[#ff0073]'}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          {isOpen ? 'Hide Editor' : 'Show Editor'}
        </button>
      </div>
      {isOpen && editor}
    </>
  );
}
