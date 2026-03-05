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
  project_url: string;
};

export const CaseStudyLayoutWrapper: FC<
  {
    children: ReactNode;
    frontMatter: CaseStudyFrontmatter;
  } & CaseStudyPreviewsProps
> = ({ children, frontMatter, prev, next }) => {
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
        <Heading size="lg" className="mt-8 !leading-tight text-muted-foreground ">
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

      <div className="max-w-3xl mx-auto px-6">
        {children}
        <Button asChild>
          <a href={frontMatter.project_url} target="_blank" rel="noopener noreferrer">
            Visit Project Website
          </a>
        </Button>
      </div>

      <div className="mx-auto max-w-screen-xl">
        <CaseStudyPreviews prev={prev} next={next} />
      </div>

      <SubscribeSection />
    </>
  );
};

type CaseStudyPreviewsProps = {
  prev?: MdxFile;
  next?: MdxFile;
};

const CaseStudyPreviews: FC<CaseStudyPreviewsProps> = ({ prev, next }) => {
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
