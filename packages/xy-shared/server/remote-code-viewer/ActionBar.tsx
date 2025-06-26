'use client';

import { useState } from 'react';

export function ActionBar({ children, editor }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`flex px-2 py-1 gap-2 text-sm justify-end border-t ${isOpen ? 'border-b' : ''} 
      border-gray-200 [&>button]:px-2 [&>button]:py-1 [&>button]:rounded [&>button:hover]:bg-gray-100`}
      >
        <button className="   " onClick={() => setIsOpen((isOpen) => !isOpen)}>
          {isOpen ? 'Hide Editor' : 'Show Editor'}
        </button>
        {children}
        <button className="   " onClick={() => setIsOpen((isOpen) => !isOpen)}>
          Copy
        </button>
        <button className="   " onClick={() => setIsOpen((isOpen) => !isOpen)}>
          Reset
        </button>
      </div>
      {isOpen && editor}
    </>
  );
}
