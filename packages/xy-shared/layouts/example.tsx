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
    is_pro_example?: boolean;
    is_free?: boolean;
  }>();

  return (
    <>
      <div className="mt-2 flex items-center space-x-2">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 leading-normal">
          {frontMatter.title}
        </h1>
        {frontMatter.is_pro_example && (
          <div className="bg-primary/5 border border-primary text-primary px-2 pb-0.5 font-bold rounded-full">
            Pro {frontMatter.is_free && 'Trial'}
          </div>
        )}
      </div>
      {children}
    </>
  );
}
