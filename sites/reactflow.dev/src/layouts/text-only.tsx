import { type ReactNode } from 'react';

// this layout is used for text only pages like imprint and privacy
export default function TextOnlyLayout({ children }: { children: ReactNode }) {
  return <div className="max-w-4xl mx-auto">{children}</div>;
}
