'use client';

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
          className={`${isOpen ? 'col-span-1' : 'col-span-2'} flex px-2 py-2 gap-1 text-sm justify-end  
       [&>button]:px-2  [&>button]:rounded-lg [&>button:hover]:bg-gray-100`}
        >
          <button
            className={` py-1 ${isOpen ? '' : 'text-[#ff0073]'}`}
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          >
            {isOpen ? 'Hide Code' : 'Show Code'}
          </button>
          {children}
        </div>
      </div>
      {isOpen && editor}
    </>
  );
}
