import Link from 'next/link';
import { Position } from '@xyflow/system';

import { Button, Text, Heading } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';
import ShowcaseOverview from '@/components/showcase-overview';
import HeadlineNode from '@/components/headline-node';
import Handle from '@/components/handle';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';

export default function XYFlowHome() {
  return (
    <BaseLayout>
      <HeroSection
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
        <ContentGridItem>
          <Heading size="sm">React Flow</Heading>
          <Text className="mt-2 mb-4" variant="light">
            A customizable React component for building node-based editors and
            interactive diagrams
          </Text>
          <Button variant="react" asChild>
            <Link href="/react-flow">Read More</Link>
          </Button>
        </ContentGridItem>

        <ContentGridItem>
          <Heading size="sm">Svelte Flow</Heading>
          <Text className="mt-2 mb-4" variant="light">
            A customizable Svelte component for building node-based editors and
            interactive diagrams
          </Text>
          <Button variant="svelte" asChild>
            <Link href="/svelte-flow">Svelte More</Link>
          </Button>
        </ContentGridItem>
      </ContentGrid>

      <ShowcaseOverview className="my-16 lg:my-24" />

      <HeroSection
        title="About xyflow"
        subtitle="We are Christopher, Hayleigh, John, and Moritz. We are the maintainers
        of React Flow, Svelte Flow, and the communities around them."
        align="center"
      />
    </BaseLayout>
  );
}
