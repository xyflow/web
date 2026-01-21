import { CaseStudy, ShowcaseLayout } from 'xy-shared/layouts/showcase';
import { SubscribeSection } from 'xy-shared/components/subscribe-section';

import { FC } from 'react';
import { getPageMap } from 'nextra/page-map';
import { fetchNotionShowcases } from 'xy-shared/server/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Showcase',
  description: 'Projects and examples using React Flow',
};

const Showcase: FC = async () => {
  const showcases = await fetchNotionShowcases();
  const caseStudies = (await getPageMap('/pro/case-studies')).filter(
    (page) => 'name' in page && page.name !== 'index',
  );
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
};

export default Showcase;
