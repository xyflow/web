import { ReactNode } from 'react';
import { useConfig } from 'nextra-theme-docs';
import {
  CaseStudyLayout as BaseCaseStudyLayout,
  getPrevAndNextPagesByTitle,
  type CaseStudyFrontmatter,
} from 'xy-shared';

export type CaseStudyLayoutProps = {
  children: ReactNode;
};

export function CaseStudyLayout({ children }: CaseStudyLayoutProps) {
  const { title, frontMatter } = useConfig<CaseStudyFrontmatter>();
  const { prev, next } = getPrevAndNextPagesByTitle(title, '/pro/case-studies');

  return (
    <BaseCaseStudyLayout frontMatter={frontMatter} prev={prev} next={next}>
      <>{children}</>
    </BaseCaseStudyLayout>
  );
}

export default CaseStudyLayout;
