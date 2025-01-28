import {
  CaseStudy,
  getMdxPagesUnderRoute,
  ShowcaseLayout,
  SubscribeSection,
} from 'xy-shared';

import { useData } from 'nextra/hooks';
import { useMemo } from 'react';

export default function Showcase() {
  const { showcases } = useData();

  const caseStudies = useMemo(() => {
    return getMdxPagesUnderRoute('/pro/case-studies').filter(
      (page) => page.name !== 'index',
    );
  }, []);

  return (
    <ShowcaseLayout
      title="Built with React Flow"
      subtitle="React Flow is used in all kinds of projects, from open-source side projects to big enterprise apps. Explore some of our favorite examples from the web."
      showcases={showcases}
      caseStudies={caseStudies as CaseStudy[]}
    >
      <SubscribeSection />
    </ShowcaseLayout>
  );
}
