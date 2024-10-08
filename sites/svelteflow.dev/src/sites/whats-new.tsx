import { useSSG } from 'nextra/ssg';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import {
  BaseLayout,
  Hero,
  TimelineEvent,
  TimelineEventProps,
  RemoteCodeViewer,
} from 'xy-shared';

export default function WhatsNew() {
  const mdx = useSSG('mdx') as TimelineEventProps[];

  return (
    <BaseLayout className="space-y-32 max-w-screen-lg mx-auto">
      <Hero
        title="What's new?"
        align="center"
        subtitle={
          <>
            Here you can find the latest news about the Svelte Flow library and
            the docs.
          </>
        }
        kicker="Timeline"
        kickerIcon={PencilSquareIcon}
      />

      {mdx.map((src, i) => (
        <TimelineEvent
          key={i}
          {...src}
          remoteCodeViewer={RemoteCodeViewer}
          exampleUrl={process.env.NEXT_PUBLIC_EXAMPLES_URL}
        />
      ))}
    </BaseLayout>
  );
}
