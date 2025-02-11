import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { BaseLayout, Hero, TimelineEvent, TimelineEventProps } from 'xy-shared';
import { FC } from 'react';
import { getPageMap } from 'nextra/page-map';
import { MdxFile } from 'nextra';

const Page: FC = async () => {
  const pageMap = (await getPageMap('/whats-new'))
    .filter((item): item is MdxFile => 'name' in item && item.name !== 'index')
    .sort(
      (a, b) =>
        new Date(b.frontMatter.date).getTime() -
        new Date(a.frontMatter.date).getTime(),
    );

  return (
    <BaseLayout className="space-y-32 max-w-screen-lg mx-auto">
      <Hero
        title="What's new?"
        align="center"
        subtitle={
          <>
            We&apos;re always working on the React Flow docs and the library.
            <br />
            This is a timeline of the things we&apos;ve added or changed so far.
          </>
        }
        kicker="Timeline"
        kickerIcon={<PencilSquareIcon />}
      />

      {pageMap.map((item) => (
        <TimelineEvent
          key={item.route}
          route={item.route}
          frontmatter={item.frontMatter as TimelineEventProps['frontmatter']}
        />
      ))}
    </BaseLayout>
  );
};

export default Page;
