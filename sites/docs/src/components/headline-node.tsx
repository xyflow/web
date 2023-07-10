import { ReactNode } from 'react';

export default function HeadlineNode({ children }: { children: ReactNode }) {
  return (
    <span className="relative shadow-lg py-2 rounded-xl bg-white">
      <span
        style={{
          backgroundImage:
            'linear-gradient(89deg, rgba(218,63,205,1) 0%, rgba(68,91,222,1) 16%, rgba(215,78,243,1) 88%, rgba(240,234,110,1) 100%)',
        }}
        className="px-8 text-transparent bg-clip-text"
      >
        {children}
      </span>
    </span>
  );
}
