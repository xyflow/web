import {
  CaseStudy,
  getMdxPagesUnderRoute,
  ShowcaseLayout,
  SubscribeSection,
} from 'xy-shared';

import { useData } from 'nextra/hooks';

export default function Showcase() {
  const { showcases } = useData();

  const caseStudies = getMdxPagesUnderRoute('/pro/case-studies').filter(
    (page) => page.name !== 'index',
  );

  return (
    <ShowcaseLayout
      title="See what you can build with React Flow"
      subtitle="We've seen React Flow used to create data processing tools, chatbot builders, machine learning, musical synthesizers, and more. Explore some of our favorite projects from around the internet."
      showcases={showcases}
      caseStudies={caseStudies as CaseStudy[]}
    >
      <SubscribeSection />
    </ShowcaseLayout>
  );
}
