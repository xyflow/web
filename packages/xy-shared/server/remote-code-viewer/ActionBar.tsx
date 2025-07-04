'use client';

import { EasyTooltip } from '@xyflow/xy-ui';
import { useState } from 'react';

export function ActionBar({ children, editor, tabslist }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`grid grid-flow-col grid-cols-2 border-t ${isOpen ? 'border-b' : ''} border-gray-200`}
      >
        {isOpen && tabslist}
        <div
          className={`${isOpen ? 'col-span-1' : 'col-span-2'} flex p-1 gap-1 text-sm justify-end  
       [&>button]:px-2  [&>button]:rounded-lg [&>button:hover]:bg-gray-100`}
        >
          <button
            className={` py-1 ${isOpen ? 'bg-gray-100' : 'text-[#ff0073]'}`}
            onClick={() => setIsOpen((isOpen) => !isOpen)}
            title="Toggle code viewer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
      {isOpen && editor}
    </>
  );
}
