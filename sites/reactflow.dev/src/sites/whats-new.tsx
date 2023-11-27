import { useSSG } from 'nextra/ssg';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { BaseLayout, Hero, TimelineEvent, TimelineEventProps } from 'xy-shared';

import ExampleViewer from '@/components/example-viewer';

export default function WhatsNew() {
  const mdx = useSSG('mdx') as TimelineEventProps[];

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
        kickerIcon={PencilSquareIcon}
      />

      {mdx.map((src, i) => (
        <TimelineEvent key={i} {...src} exampleViewer={ExampleViewer} />
      ))}
    </BaseLayout>
  );
}
