import { type ReactNode } from 'react';
import { useConfig } from 'nextra-theme-docs';
import { type MdxFile } from 'nextra';
import { getPagesUnderRoute } from 'nextra/context';

import ContentGrid, { ContentGridItem } from '@/components/content-grid';
import BlogPostPreview from '@/components/blog-post-preview';
import AuthorList from '@/components/authors-list';

function isMdxPage(page: MdxFile | any): page is MdxFile {
  return page?.kind === 'MdxPage';
}

function BlogPostPreviews() {
  const { frontMatter } = useConfig();
  const blogPostPages = getPagesUnderRoute('/blog').filter(isMdxPage);

  const currentIndex = blogPostPages.findIndex(
    (page) => page.frontMatter?.title === frontMatter.title
  );
  const prevIndex =
    currentIndex === 0 ? blogPostPages.length - 1 : currentIndex - 1;

  const nextIndex =
    currentIndex === blogPostPages.length - 1 ? 0 : currentIndex + 1;

  const prevPost = blogPostPages[prevIndex];
  const nextPost = blogPostPages[nextIndex];

  return (
    <div className="mt-20 relative right-1/2 left-1/2 ml-[-50vw] mr-[-50vw] w-[100vw]">
      <ContentGrid className="max-w-[90rem] mx-auto">
        <ContentGridItem route={prevPost.route}>
          <BlogPostPreview
            title={prevPost.frontMatter?.title}
            intro={prevPost.frontMatter?.intro}
            date={prevPost.frontMatter?.date}
            authors={prevPost.frontMatter?.authors}
            route={prevPost.route}
          />
        </ContentGridItem>
        <ContentGridItem route={nextPost.route}>
          <BlogPostPreview
            title={nextPost.frontMatter?.title}
            intro={nextPost.frontMatter?.intro}
            date={nextPost.frontMatter?.date}
            authors={nextPost.frontMatter?.authors}
            route={nextPost.route}
          />
        </ContentGridItem>
      </ContentGrid>
    </div>
  );
}

export default function BlogPostLayout({ children }: { children: ReactNode }) {
  const { frontMatter } = useConfig();

  return (
    <>
      <div className="text-light mt-10">{frontMatter.date}</div>
      <h1 className="!font-black !text-6xl !text-left !mt-2 !mb-6">
        {frontMatter.title}
      </h1>
      <AuthorList authors={frontMatter.authors} className="mb-10" />

      <div>{children}</div>

      <BlogPostPreviews />
    </>
  );
}
