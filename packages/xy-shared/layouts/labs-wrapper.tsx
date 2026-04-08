import { ReactNode, FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type MdxFile } from 'nextra';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Heading } from '../components/ui/heading';
import { Text } from '../components/ui/text';
import { Container } from '../components/ui/container';
import { ContentGrid, ContentGridItem } from '../components/ui/content-grid';
import { Button } from '../components/ui/button';
import { AuthorList, Author } from '../components/authors-list';
import { ProjectPreview } from '../components/project-preview';
import { SubscribeSection } from '../components/subscribe-section';

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
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mt-16 flex items-end">
          <Link href="." className="text-md mr-1 font-normal text-gray-500">
            Labs
          </Link>
          <ChevronRightIcon className="mb-0.5 h-5 w-5 text-gray-500" />
          <Text className="text-md ml-1 font-medium">{frontMatter.title}</Text>
        </div>
        <div className="mt-8 flex w-full flex-col items-start justify-start md:flex-row md:items-center md:justify-between">
          <Heading size="lg" className="text-muted-foreground !leading-tight">
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

      <Container className="mx-auto mb-8 mt-8 max-w-screen-xl bg-gray-50">
        <a href={frontMatter.project_url} target="_blank" rel="noopener noreferrer">
          <Image
            src={frontMatter.image}
            width={frontMatter.image_width}
            height={frontMatter.image_height}
            alt={`${frontMatter.title} screenshot`}
          />
        </a>
      </Container>

      <div className="mx-auto max-w-3xl px-6">
        {children}

        <div className="flex w-full flex-row justify-start gap-4">
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
