import { type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useConfig } from 'nextra-theme-docs';

import { Button, Heading, Text } from 'xy-ui';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';
import ProjectPreview from '@/components/project-preview';
import { getPrevAndNextPagesByTitle } from '@/utils';

export default function CaseStudyLayout({ children }: { children: ReactNode }) {
  const { frontMatter } = useConfig();

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <Heading size="lg" className="mt-20">
          {frontMatter.title}
        </Heading>

        <Image
          src={frontMatter.intervieweeImage}
          width={32}
          height={32}
          alt={`${frontMatter.interviewee} `}
          className="rounded-full"
        />
        <Text size="md" className="mt-4 lg:mt-6">
          {frontMatter.interviewee}
        </Text>
      </div>

      <Image
        src={frontMatter.image}
        width={frontMatter.image_width}
        height={frontMatter.image_height}
        alt={`${frontMatter.title} screenshot`}
        className="shadow-md mx-auto my-14 rounded-md border border-solid border-gray-100"
      />

      <div className="max-w-3xl mx-auto">{children}</div>

      <CaseStudyPreviews />

      <div className="text-center">
        <Heading as="h3" className="mb-4 mt-20 font-bold">
          Get React Flow <span className="text-react">Pro</span> today
        </Heading>
        <Text size="lg">
          Ensure the sustainable maintenance and development of the React Flow
          library.
        </Text>
        <Button asChild variant="react" size="lg" className="mt-7">
          <Link href="/react-flow/pro">Get Pro</Link>
        </Button>
      </div>
    </>
  );
}

function CaseStudyPreviews() {
  const { frontMatter } = useConfig();
  const [prevCaseStudy, nextCaseStudy] = getPrevAndNextPagesByTitle(
    frontMatter.title,
    '/case-studies'
  );

  return (
    <ContentGrid className="mt-20">
      <ContentGridItem route={prevCaseStudy.route}>
        <ProjectPreview
          image={nextCaseStudy.frontMatter?.image}
          kicker={nextCaseStudy.frontMatter?.client}
          title={prevCaseStudy.frontMatter?.title}
          description={prevCaseStudy.frontMatter?.description}
        />
      </ContentGridItem>
      <ContentGridItem route={nextCaseStudy.route}>
        <ProjectPreview
          image={nextCaseStudy.frontMatter?.image}
          kicker={nextCaseStudy.frontMatter?.client}
          title={nextCaseStudy.frontMatter?.title}
          description={nextCaseStudy.frontMatter?.description}
        />
      </ContentGridItem>
    </ContentGrid>
  );
}
