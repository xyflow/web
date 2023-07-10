import { ReactNode } from 'react';

// background: linear-gradient(0deg, #000000, #000000),
// linear-gradient(89.48deg, #DA3FCD -16.15%, #445BDE 16.16%, #D74EF3 88.34%, #F0EA6E 111.71%);

export default function HeadlineNode({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        backgroundImage:
          'linear-gradient(89deg, rgba(218,63,205,1) 0%, rgba(68,91,222,1) 16%, rgba(215,78,243,1) 89%, rgba(240,234,110,1) 100%)',
      }}
      className="px-8 py-4 -mt-2 shadow-lg rounded-xl text-transparent bg-clip-text"
    >
      {children}
    </span>
  );
}
