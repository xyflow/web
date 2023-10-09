import { type ReactNode } from 'react';

export type TextOnlyLayoutProps = {
  children: ReactNode;
};

/**
 * Use this layout for pages that only contain text, like a terms of service or
 * privacy policy page.
 *
 */
export function TextOnlyLayout({ children }: TextOnlyLayoutProps) {
  return <div className="max-w-4xl mx-auto">{children}</div>;
}
