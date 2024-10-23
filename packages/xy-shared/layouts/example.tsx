import { UseConfigContext } from '../context/UseConfigContext';
import { useContext, type ReactNode } from 'react';

type ExampleLayoutProps = {
  children: ReactNode;
};

/**
 * This basic layout is used for all the example pages across reactflow.dev and
 * svelteflow.dev.
 *
 */
export function ExampleLayout({ children }: ExampleLayoutProps) {
  const useConfig = useContext(UseConfigContext);
  const { frontMatter } = useConfig<{
    title: string;
  }>();

  return (
    <>
      <div className="mt-2 flex items-center space-x-2">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 leading-normal">
          {frontMatter.title}
        </h1>
      </div>
      {children}
    </>
  );
}
