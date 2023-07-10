import Link from 'next/link';

import { Button, Text, Heading } from 'xy-ui';
import BaseLayout from '@/layouts/base';
import HeroSection from '@/components/hero-section';
import ShowcaseOverview from '@/components/showcase-overview';
import HeadlineNode from '@/components/headline-node';
import ContentGrid, { ContentGridItem } from '@/components/content-grid';

export default function XYFlowHome() {
  return (
    <BaseLayout>
      <HeroSection
        title={
          <>
            <HeadlineNode>Wire</HeadlineNode> your{' '}
            <HeadlineNode>ideas</HeadlineNode> with{' '}
            <HeadlineNode>xyflow</HeadlineNode>
          </>
        }
        subtitle="Powerful open source libraries for building node-based UIs with React or Svelte. Ready out-of-the-box and infinitely customizable"
        align="center"
        size="xl"
      />

      <ContentGrid>
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
