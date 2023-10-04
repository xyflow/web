import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { type MdxFile } from 'nextra';
import { type ReactNode } from 'react';
import { useConfig } from 'nextra-theme-docs';
import Image from 'next/image';
import Link from 'next/link';

import {
  AuthorList,
  Button,
  Heading,
  Text,
  Container,
  ContentGrid,
  ContentGridItem,
  ProjectPreview,
} from '../../';

export type CaseStudyLayoutProps = {
  prev: MdxFile;
  next: MdxFile;
  children: ReactNode;
};

export function CaseStudyLayout({
  prev,
  next,
  children,
}: CaseStudyLayoutProps) {
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

      <Container className="mx-auto mt-8 bg-gray-50">
        <Image
          src={frontMatter.image}
          width={frontMatter.image_width}
          height={frontMatter.image_height}
          alt={`${frontMatter.title} screenshot`}
        />
      </Container>

      <div className="max-w-3xl mx-auto">{children}</div>

      <CaseStudyPreviews prev={prev} next={next} />

      <div className="text-center">
        <Heading as="h3" className="mb-4 mt-24 font-bold">
          Get React Flow <span className="text-react">Pro</span> today
        </Heading>
        <Text size="lg">
          Ensure the sustainable maintenance and development of the React Flow
          library.
        </Text>
        <Button size="lg" asChild variant="react-pro" className="mt-12 mb-16">
          <Link href="/react-flow/pro" className="flex items-center">
            <SparklesIcon className="w-5 h-5 mr-1" />
            React Flow Pro
          </Link>
        </Button>
      </div>
    </>
  );
}

type CaseStudyPreviewsProps = {
  prev: MdxFile;
  next: MdxFile;
};

function CaseStudyPreviews({ prev, next }: CaseStudyPreviewsProps) {
  return (
    <ContentGrid className="mt-20">
      {prev && (
        <ContentGridItem route={prev.route}>
          <ProjectPreview
            image={prev.frontMatter?.image}
            kicker={prev.frontMatter?.client}
            title={prev.frontMatter?.title}
            description={prev.frontMatter?.description}
          />
        </ContentGridItem>
      )}

      {next && (
        <ContentGridItem route={next.route}>
          <ProjectPreview
            image={next.frontMatter?.image}
            kicker={next.frontMatter?.client}
            title={next.frontMatter?.title}
            description={next.frontMatter?.description}
          />
        </ContentGridItem>
      )}
    </ContentGrid>
  );
}
