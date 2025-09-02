import { ReactNode, FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type MdxFile } from 'nextra';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  Heading,
  Text,
  Container,
  ContentGrid,
  ContentGridItem,
  Button,
} from '@xyflow/xy-ui';

import { AuthorList, Author, ProjectPreview, SubscribeSection } from '..';

export type LabsFrontmatter = {
  title: string;
  description: string;
  authors: Author[];
  image: string;
  image_width: number;
  image_height: number;
  project_url: string;
  repo_url?: string;
};

export const LabsLayoutWrapper: FC<
  {
    children: ReactNode;
    frontMatter: LabsFrontmatter;
  } & LabsPreviewsProps
> = ({ children, frontMatter, prev, next }) => {
  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex mt-16 items-end">
          <Link href="." className="mr-1 text-md text-gray-500 font-normal">
            Labs
          </Link>
          <ChevronRightIcon className="h-5 w-5 mb-0.5 text-gray-500" />
          <Text className="ml-1 text-md font-medium">{frontMatter.title}</Text>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center w-full justify-start md:justify-between mt-8">
          <Heading size="lg" className="!leading-tight text-gray-900 ">
            {frontMatter.title}
          </Heading>
          <Button asChild className="mt-6">
            <a
              href={frontMatter.project_url}
              rel="noopener noreferrer"
              target="_blank"
              className="text-lg"
            >
              Open Project
            </a>
          </Button>
        </div>
        <AuthorList authors={frontMatter.authors} className="mt-6" />
      </div>

      <Container className="mx-auto mt-8 mb-8 bg-gray-50 max-w-screen-xl">
        <a href={frontMatter.project_url} target="_blank" rel="noopener noreferrer">
          <Image
            src={frontMatter.image}
            width={frontMatter.image_width}
            height={frontMatter.image_height}
            alt={`${frontMatter.title} screenshot`}
          />
        </a>
      </Container>

      <div className="max-w-3xl mx-auto px-6">
        {children}

        <div className="flex flex-row gap-4 w-full justify-start">
          <Button asChild className="mt-6">
            <a href={frontMatter.project_url} target="_blank" rel="noopener noreferrer">
              Open Project
            </a>
          </Button>

          {frontMatter.repo_url && (
            <Button asChild className="mt-6" variant="secondary">
              <a href={frontMatter.repo_url} target="_blank" rel="noopener noreferrer">
                View Source Code
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <LabsPreviews prev={prev} next={next} />
      </div>

      <SubscribeSection />
    </>
  );
};

type LabsPreviewsProps = {
  prev?: MdxFile;
  next?: MdxFile;
};

const LabsPreviews: FC<LabsPreviewsProps> = ({ prev, next }) => {
  return (
    <ContentGrid className="mt-20">
      <ContentGridItem route={prev?.route}>
        {prev?.frontMatter && (
          <ProjectPreview
            image={prev.frontMatter.image}
            kicker={prev.frontMatter.client}
            title={prev.frontMatter.title}
            description={prev.frontMatter.description}
          />
        )}
      </ContentGridItem>

      <ContentGridItem route={next?.route}>
        {next?.frontMatter && (
          <ProjectPreview
            image={next.frontMatter.image}
            kicker={next.frontMatter.client}
            title={next.frontMatter.title}
            description={next.frontMatter.description}
          />
        )}
      </ContentGridItem>
    </ContentGrid>
  );
};
