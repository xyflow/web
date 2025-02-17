// TODO: remove this after Nextra 4 migration
import { FC, ReactNode, useContext } from 'react';
import { SharedContext } from '../context/shared-context';
import { getPrevAndNextPagesByTitle } from '../lib';
import {
  CaseStudyFrontmatter,
  CaseStudyLayoutWrapper,
} from './case-study-wrapper';

export const CaseStudyLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { useConfig } = useContext(SharedContext);
  const { title, frontMatter } = useConfig<CaseStudyFrontmatter>();

  const { prev, next } = getPrevAndNextPagesByTitle(title, '/pro/case-studies');

  return (
    <CaseStudyLayoutWrapper frontMatter={frontMatter} prev={prev} next={next}>
      {children}
    </CaseStudyLayoutWrapper>
  );
};
