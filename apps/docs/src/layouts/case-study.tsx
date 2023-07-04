import { type ReactNode } from 'react';
import Link from 'next/link';
import { useConfig } from 'nextra-theme-docs';
import { getPagesUnderRoute } from 'nextra/context';

import { Button } from 'xy-ui';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';
import CaseStudyPreview from '@/components/case-study-preview';

function CaseStudyPreviews() {
  const { frontMatter } = useConfig();
  const caseStudyPages = getPagesUnderRoute('/case-studies');

  const currentIndex = caseStudyPages.findIndex(
    // @ts-ignore
    (page) => page.frontMatter?.title === frontMatter.title
  );
  const prevIndex =
    currentIndex === 0 ? caseStudyPages.length - 1 : currentIndex - 1;

  const nextIndex =
    currentIndex === caseStudyPages.length - 1 ? 0 : currentIndex + 1;

  const prevCaseStudy = caseStudyPages[prevIndex];
  const nextCaseStudy = caseStudyPages[nextIndex];

  return (
    <ContentGrid className="mt-20">
      <ContentGridItem route={prevCaseStudy.route}>
        <CaseStudyPreview
          // @ts-ignore
          client={prevCaseStudy.frontMatter?.client}
          // @ts-ignore
          title={prevCaseStudy.frontMatter?.title}
          // @ts-ignore
          description={prevCaseStudy.frontMatter?.description}
          route={prevCaseStudy.route}
        />
      </ContentGridItem>
      <ContentGridItem route={nextCaseStudy.route}>
        <CaseStudyPreview
          // @ts-ignore
          client={nextCaseStudy.frontMatter?.client}
          // @ts-ignore
          title={nextCaseStudy.frontMatter?.title}
          // @ts-ignore
          description={nextCaseStudy.frontMatter?.description}
          route={nextCaseStudy.route}
        />
      </ContentGridItem>
    </ContentGrid>
  );
}

// this layout is used for the case study pages
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
