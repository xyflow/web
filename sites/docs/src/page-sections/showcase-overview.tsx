import Link from 'next/link';

import { Button, Container, Heading, Text, cn } from 'xy-ui';
import useXYSite from '@/hooks/use-xy-site';

export default function ShowcaseOverview({
  className,
}: {
  className?: string;
}) {
  const { site } = useXYSite();

  return (
    <Container variant="dark" className={className}>
      <div className="p-14">
        <div className="grid lg:grid-cols-2 lg:gap-40">
          <div>
            <Text
              className={cn(
                'font-bold mb-2',
                site !== 'xyflow' ? `text-${site}` : 'text-gray-300'
              )}
            >
              Project Showcase
            </Text>

            <Heading className="mb-4">Used by thousands of people</Heading>
          </div>
          <div>
            <Text className="mt-4 mb-4">
              From solo open-source developers, to companies like Stripe and
              Typeform. We’ve seen the library used for data processing tools,
              chatbot builders, machine learning, musical synthezisers, and
              more.
            </Text>
            <Button asChild variant="secondary" className={`text-${site}`}>
              <Link href="/showcase">See all projects</Link>
            </Button>
          </div>
        </div>

        <div className="h-[600px]"></div>
      </div>
    </Container>
  );
}
