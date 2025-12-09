import { type ReactNode } from 'react';
import { type MdxFile } from 'nextra';
import { Text } from '../components/ui/text';
import { Heading } from '../components/ui/heading';
import { ContentGrid, ContentGridItem } from '../components/ui/content-grid';
import { type Author, AuthorList } from '../components/authors-list';
import { SubscribeSection } from '../components/subscribe-section';
import { BlogPostPreview } from '../components/blog-post/preview';

export type BlogPostFrontmatter = {
  title: string;
  htmlTitle?: string;
  intro: string;
  date: string;
  authors: Author[];
};

export type BlogPostLayoutProps = {
  frontMatter: BlogPostFrontmatter;
  prev?: MdxFile;
  next?: MdxFile;
  children: ReactNode;
};

export function BaseBlogPostLayout({
  frontMatter,
  prev,
  next,
  children,
}: BlogPostLayoutProps) {
  return (
    <div className="max-w-screen-md mx-auto">
      <Text variant="light" className="mt-10">
        {frontMatter.date}
      </Text>
      {/* we have to use important (!) here to overwrite the nextra article default styles */}
      <Heading className="!font-black !text-6xl !text-left !mt-2 !mb-8">
        {frontMatter.htmlTitle ? (
          <span dangerouslySetInnerHTML={{ __html: frontMatter.htmlTitle }} />
        ) : (
          frontMatter.title
        )}
      </Heading>
      <AuthorList authors={frontMatter.authors} className="mb-6" />

      <div className="max-w-3xl mx-auto [&>p]:text-lg [&>p]:leading-loose [&>h1]:mt-16 [&>h2]:border-none [&>h2]:mt-16 [&>ul]:text-lg ">
        {children}
      </div>

      <div className="mx-auto max-w-3xl">
        <BlogPostPreviews prev={prev} next={next} />
      </div>

      <SubscribeSection btnLink="https://reactflow.dev/pro" />
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
      <ContentGrid className="x:max-w-(--nextra-content-width) mx-auto">
        {prev && (
          <ContentGridItem route={prev?.route}>
            <BlogPostPreview
              title={prev.frontMatter?.title}
              intro={prev.frontMatter?.intro}
              date={prev.frontMatter?.date}
              authors={prev.frontMatter?.authors}
              headingSize="md"
            />
          </ContentGridItem>
        )}

        {next && (
          <ContentGridItem route={next?.route}>
            <BlogPostPreview
              title={next.frontMatter?.title}
              intro={next.frontMatter?.intro}
              date={next.frontMatter?.date}
              authors={next.frontMatter?.authors}
              headingSize="md"
            />
          </ContentGridItem>
        )}
      </ContentGrid>
    </div>
  );
}
