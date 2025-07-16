import { Metadata } from 'next';
import { getPageMap } from 'nextra/page-map';
import { FC } from 'react';
import { CaseStudy, ShowcaseLayout, SubscribeSection } from 'xy-shared';
import showcaseItems from './showcases.json';

export const metadata: Metadata = {
  title: 'Showcase',
  description: 'Projects and examples using React Flow',
};

const Showcase: FC = async () => {
  const showcases = showcaseItems
    .filter((i) => i.library == 'React Flow')
    .map((showcase) => {
      return {
        ...showcase,
        tags: showcase.tags?.map?.((tag, i) => ({ id: tag, name: tag })) ?? [],
      };
    });
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
