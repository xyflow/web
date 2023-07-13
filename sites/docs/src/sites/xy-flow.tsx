import Link from 'next/link';
import { Position } from '@xyflow/system';

import { Button, Text, Heading } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import Hero from '@/page-sections/hero';
import ShowcaseOverview from '@/page-sections/showcase-overview';
import HeadlineNode from '@/components/headline-node';
import Handle from '@/components/handle';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';
import Logo from '@/components/logo';

export default function XYFlowHome() {
  return (
    <BaseLayout>
      <Hero
        title={
          <>
            <HeadlineNode>
              Wire
              <Handle
                type="source"
                position={Position.Right}
                id="xy-wire-source"
                to="xy-wire-target"
                className="-left-[100vw] top-1/2"
                variant="xyflow"
              />
              <Handle
                type="target"
                position={Position.Left}
                id="xy-wire-target"
                className="top-1/2 -left-2"
                variant="xyflow"
              />
            </HeadlineNode>{' '}
            your{' '}
            <HeadlineNode>
              <Handle
                type="source"
                position={Position.Bottom}
                id="xy-ideas"
                to="xy-xyflow"
                className="bottom-0 right-4"
                variant="xyflow"
              />
              ideas
            </HeadlineNode>{' '}
            with{' '}
            <HeadlineNode>
              <Handle
                type="target"
                id="xy-xyflow"
                position={Position.Right}
                className="top-1/2 -translate-y-1/2 right-0"
                variant="xyflow"
              />
              xyflow
            </HeadlineNode>
          </>
        }
        subtitle="Powerful open source libraries for building node-based UIs with React or Svelte. Ready out-of-the-box and infinitely customizable"
        align="center"
        size="xl"
        showGradient
      />

      <ContentGrid className="mt-16 lg:mt-24">
        <ContentGridItem route="/react-flow">
          <Heading size="sm" className="flex items-center">
            <Logo variant="react" className="mr-2" /> React Flow
          </Heading>
          <Text className="mt-2 mb-4" variant="light">
            A customizable React component for building node-based editors and
            interactive diagrams
          </Text>
          <Button variant="react" asChild size="lg">
            <Link href="/react-flow">Read More</Link>
          </Button>
        </ContentGridItem>

        <ContentGridItem route="/svelte-flow">
          <Heading size="sm" className="flex items-center">
            <Logo variant="svelte" className="mr-2" /> Svelte Flow
          </Heading>
          <Text className="mt-2 mb-4" variant="light">
            A customizable Svelte component for building node-based editors and
            interactive diagrams
          </Text>
          <Button variant="svelte" asChild size="lg">
            <Link href="/svelte-flow">Read More</Link>
          </Button>
        </ContentGridItem>
      </ContentGrid>

      <ShowcaseOverview className="my-16 lg:my-24" />

      <Hero
        title="About xyflow"
        subtitle="We are Christopher, Hayleigh, John, and Moritz. We are the maintainers
        of React Flow, Svelte Flow, and the communities around them."
        align="center"
      />
    </BaseLayout>
  );
}
