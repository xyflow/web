import { type ReactNode } from 'react';

// this component is used for text only pages like imprint and privacy
export default function SimpleLayout({ children }: { children: ReactNode }) {
  return <div className="max-w-4xl mx-auto">{children}</div>;
}
