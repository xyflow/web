'use client';

import {
  Turnstile as TurnstileComponent,
  TurnstileInstance,
} from '@marsidev/react-turnstile';
import { useTheme } from 'nextra-theme-docs';

export type TurnstileRef = TurnstileInstance;

export const turnstileError = 'Make sure you are human';

export function Turnstile({ ref }: { ref: React.RefObject<TurnstileInstance | null> }) {
  const colorMode = useTheme();

  return (
    <TurnstileComponent
      ref={ref}
      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
      className="mt-4"
      options={{
        theme:
          colorMode.theme === 'system' || !colorMode.theme
            ? 'auto'
            : (colorMode.theme as 'light' | 'dark'),
        size: 'flexible',
      }}
    />
  );
}
