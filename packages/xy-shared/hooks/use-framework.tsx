'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { type Framework } from '../types';

const FrameworkContext = createContext<Framework | null>(null);

export function FrameworkProvider({
  framework,
  children,
}: {
  framework: Framework;
  children: ReactNode;
}) {
  return (
    <FrameworkContext.Provider value={framework}>
      {children}
    </FrameworkContext.Provider>
  );
}

export function useFramework(): Framework {
  const framework = useContext(FrameworkContext);
  
  if (framework === null) {
    throw new Error(
      'useFramework must be used within a FrameworkProvider. ' +
      'Make sure to wrap your app with <FrameworkProvider framework="react" /> or <FrameworkProvider framework="svelte" />'
    );
  }
  
  return framework;
}
