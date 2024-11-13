import { useData } from 'nextra/hooks';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import {
  BaseLayout,
  Hero,
  TimelineEvent,
  TimelineEventProps,
  RemoteCodeViewer,
} from 'xy-shared';

export default function WhatsNew() {
  const mdx = useData('mdx') as TimelineEventProps[];
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
          mdx={src.mdx}
          frontmatter={src.frontmatter}
          remoteCodeViewer={RemoteCodeViewer}
        />
      ))}
    </BaseLayout>
  );
}
