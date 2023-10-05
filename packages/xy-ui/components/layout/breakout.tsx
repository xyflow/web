import { ReactNode } from 'react';

function LayoutBreakout({ children }: { children: ReactNode }) {
  return (
    <div className="relative right-1/2 left-1/2 ml-[-50vw] mr-[-50vw] max-w-[100vw] w-[100vw] -mt-16">
      {children}
    </div>
  );
}

export { LayoutBreakout };
