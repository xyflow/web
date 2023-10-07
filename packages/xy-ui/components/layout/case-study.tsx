import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { type MdxFile } from 'nextra';
import { type ReactNode } from 'react';
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
  Author,
} from '../../';

export type CaseStudyFrontmatter = {
  title: string;
  description: string;
  authors: Author[];
  client: string;
  clientLogo: string;
  interviewee: string;
  intervieweeImage: string;
  image: string;
  image_width: number;
  image_height: number;
};

export type CaseStudyLayoutProps = {
  frontMatter: CaseStudyFrontmatter;
  prev?: MdxFile;
  next?: MdxFile;
  children: ReactNode;
};

export function CaseStudyLayout({
  frontMatter,
  prev,
  next,
  children,
}: CaseStudyLayoutProps) {
  return (
    <>
      <div className="max-w-3xl mx-auto px-6">
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

      <Container className="mx-auto mt-8 bg-gray-50 max-w-screen-xl">
        <Image
          src={frontMatter.image}
          width={frontMatter.image_width}
          height={frontMatter.image_height}
          alt={`${frontMatter.title} screenshot`}
        />
      </Container>

      <div className="max-w-3xl mx-auto px-6">{children}</div>

      <div className="mx-auto max-w-screen-xl">
        <CaseStudyPreviews prev={prev} next={next} />
      </div>

      <div className="text-center mb-10">
        <Heading as="h3" className="mb-4 mt-24 font-bold">
          Get React Flow <span className="text-primary">Pro</span> today
        </Heading>
        <Text size="lg">
          Ensure the sustainable maintenance and development of the React Flow
          library.
        </Text>
        <Button size="lg" asChild variant="pro" className="mt-12 mb-16">
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
  prev?: MdxFile;
  next?: MdxFile;
};

function CaseStudyPreviews({ prev, next }: CaseStudyPreviewsProps) {
  return (
    <ContentGrid className="mt-20">
      <ContentGridItem route={prev?.route}>
        {prev && (
          <ProjectPreview
            image={prev.frontMatter?.image}
            kicker={prev.frontMatter?.client}
            title={prev.frontMatter?.title}
            description={prev.frontMatter?.description}
          />
        )}
      </ContentGridItem>

      <ContentGridItem route={next?.route}>
        {next && (
          <ProjectPreview
            image={next.frontMatter?.image}
            kicker={next.frontMatter?.client}
            title={next.frontMatter?.title}
            description={next.frontMatter?.description}
          />
        )}
      </ContentGridItem>
    </ContentGrid>
  );
}
