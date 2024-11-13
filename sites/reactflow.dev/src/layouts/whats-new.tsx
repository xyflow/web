import { useData } from 'nextra/hooks';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import {
  BaseLayout,
  Hero,
  RemoteCodeViewer,
  TimelineEvent,
  TimelineEventProps,
} from 'xy-shared';



import ProExampleViewer from '@/components/pro-example-viewer';

export default function WhatsNew() {
  const mdx = useData('mdx') as TimelineEventProps[];
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
        <TimelineEvent
          key={i}
          mdx={src.mdx}
          frontmatter={src.frontmatter}
          proExampleViewer={ProExampleViewer}
          remoteCodeViewer={RemoteCodeViewer}
          // We need to pass the env var here, because we don't have access to it inside the mdx when using MDXRemote
          exampleUrl={process.env.NEXT_PUBLIC_EXAMPLES_URL}
        />
      ))}
    </BaseLayout>
  );
}
