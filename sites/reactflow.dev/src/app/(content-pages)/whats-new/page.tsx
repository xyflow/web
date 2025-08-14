import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { BaseLayout, Hero } from 'xy-shared';
import { TimelineEvent, TimelineEventProps, getLastChangelog } from 'xy-shared/server';
import { FC } from 'react';
import { NextraMetadata } from 'nextra';

export const metadata: NextraMetadata = {
  asIndexPage: true,
  title: "What's new?",
  description:
    "We're always working on the React Flow docs and the library. This is a timeline of the things we've added or changed so far.",
};

const Page: FC = async () => {
  const pageMap = await getLastChangelog();
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
