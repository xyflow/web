import { type ReactNode } from 'react';
import Link from 'next/link';
import { useConfig } from 'nextra-theme-docs';

import { Button } from 'xy-ui';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';
import CaseStudyPreview from '@/components/case-study-preview';
import { getPrevAndNextPagesByTitle } from '@/utils';

function CaseStudyPreviews() {
  const { frontMatter } = useConfig();
  const [prevCaseStudy, nextCaseStudy] = getPrevAndNextPagesByTitle(
    frontMatter.title,
    '/case-studies'
  );

  return (
    <ContentGrid className="mt-20">
      <ContentGridItem route={prevCaseStudy.route}>
        <CaseStudyPreview
          client={prevCaseStudy.frontMatter?.client}
          title={prevCaseStudy.frontMatter?.title}
          description={prevCaseStudy.frontMatter?.description}
          route={prevCaseStudy.route}
        />
      </ContentGridItem>
      <ContentGridItem route={nextCaseStudy.route}>
        <CaseStudyPreview
          client={nextCaseStudy.frontMatter?.client}
          title={nextCaseStudy.frontMatter?.title}
          description={nextCaseStudy.frontMatter?.description}
          route={nextCaseStudy.route}
        />
      </ContentGridItem>
    </ContentGrid>
  );
}

export default function CaseStudyLayout({ children }: { children: ReactNode }) {
  const { frontMatter } = useConfig();

  return (
    <>
      <h1 className="font-black text-6xl mb-4 mt-20">{frontMatter.title}</h1>
      <h2 className="text-xl max-w-3xl">{frontMatter.description}</h2>

      <div>{children}</div>

      <CaseStudyPreviews />

      <div className="text-center">
        <h3 className="font-bold mb-4 mt-20 text-6xl">
          Get React Flow <span className="text-react">Pro</span> today
        </h3>
        <p className="text-xl">
          Ensure the sustainable maintenance and development of the React Flow
          library.
        </p>
        <Button asChild variant="react" size="lg" className="mt-7">
          <Link href="/react-flow/pro">Get Pro</Link>
        </Button>
      </div>
    </>
  );
}
