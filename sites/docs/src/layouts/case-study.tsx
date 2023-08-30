import { type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useConfig } from 'nextra-theme-docs';

import { Button, Heading, Text, Container } from 'xy-ui';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

import ContentGrid, { ContentGridItem } from '@/components/content-grid';
import ProjectPreview from '@/components/project-preview';
import { getPrevAndNextPagesByTitle } from '@/utils';
import AuthorList from '@/components/authors-list';

export default function CaseStudyLayout({ children }: { children: ReactNode }) {
  const { frontMatter } = useConfig();

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="flex mt-16 items-end">
          <Link href="." className="mr-1 text-md text-gray-500 font-normal">
            Case Studies
          </Link>
          <ChevronRightIcon className="h-5 w-5 mb-0.5 text-gray-500" />
          <Text className="ml-1 text-md font-medium">{frontMatter.client}</Text>
        </div>
        <Heading size="lg" className="mt-8 !leading-tight text-gray-900 ">
          {frontMatter.title}
        </Heading>
        <AuthorList authors={frontMatter.authors} className="mt-6" />
      </div>
      {/* I want the container to inherit the width of its children */}
      <Container className="mx-auto mt-8 bg-gray-50">
        <Image
          src={frontMatter.image}
          width={frontMatter.image_width}
          height={frontMatter.image_height}
          alt={`${frontMatter.title} screenshot`}
        />
      </Container>

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
