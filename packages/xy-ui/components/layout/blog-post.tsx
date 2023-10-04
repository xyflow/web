import { type MdxFile } from 'nextra';
import { type ReactNode } from 'react';
import { type Author } from '../../';

import {
  AuthorList,
  Text,
  Heading,
  ContentGrid,
  ContentGridItem,
  BlogPostPreview,
} from '../../';

export type BlogPostFrontmatter = {
  title: string;
  intro: string;
  date: string;
  authors: Author[];
};

export type BlogPostLayoutProps = {
  usePostMetadata: () => {
    frontMatter: BlogPostFrontmatter;
    prev?: MdxFile;
    next?: MdxFile;
  };
  children: ReactNode;
};

/**
 *
 */
export function BlogPostLayout({
  usePostMetadata,
  children,
}: BlogPostLayoutProps) {
  const { frontMatter, prev, next } = usePostMetadata();

  return (
    <div className="max-w-screen-md mx-auto">
      <Text variant="light" className="mt-10">
        {frontMatter.date}
      </Text>
      {/* we have to use important (!) here to overwrite the nextra article default styles */}
      <Heading className="!font-black !text-6xl !text-left !mt-2 !mb-6">
        {frontMatter.title}
      </Heading>
      <AuthorList authors={frontMatter.authors} className="mb-10" />

      <div>{children}</div>

      <BlogPostPreviews prev={prev} next={next} />
    </div>
  );
}

type BlogPostPreviewsProps = {
  prev?: MdxFile;
  next?: MdxFile;
};

function BlogPostPreviews({ prev, next }: BlogPostPreviewsProps) {
  return (
    <div className="mt-20 relative right-1/2 left-1/2 ml-[-50vw] mr-[-50vw] w-[100vw]">
      <ContentGrid className="max-w-[90rem] mx-auto">
        <ContentGridItem route={prev?.route}>
          {prev && (
            <BlogPostPreview
              title={prev.frontMatter?.title}
              intro={prev.frontMatter?.intro}
              date={prev.frontMatter?.date}
              authors={prev.frontMatter?.authors}
            />
          )}
        </ContentGridItem>

        <ContentGridItem route={next?.route}>
          {next && (
            <BlogPostPreview
              title={next.frontMatter?.title}
              intro={next.frontMatter?.intro}
              date={next.frontMatter?.date}
              authors={next.frontMatter?.authors}
            />
          )}
        </ContentGridItem>
      </ContentGrid>
    </div>
  );
}
