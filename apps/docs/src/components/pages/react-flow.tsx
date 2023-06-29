import { useSSG } from 'nextra/ssg';

import { Button } from 'xy-ui';
import PageSection from '@/components/page-section';

export default function ReactFlowHome() {
  const { stars, downloads } = useSSG();

  return (
    <PageSection>
      React Flow <Button variant="react">React Flow</Button>
      <div>Stars: {stars}</div>
      <div>Downloads: {downloads}</div>
    </PageSection>
  );
}
