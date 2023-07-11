import Link from 'next/link';

import { Button, Container } from 'xy-ui';
import Hero from '@/page-sections/hero';
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
        <Hero title="Used by thousands of people" kicker="Project Showcase">
          <p className="mt-4 mb-4">
            From solo open-source developers, to companies like Stripe and
            Typeform. We’ve seen the library used for data processing tools,
            chatbot builders, machine learning, musical synthezisers, and more.
          </p>
          <Button asChild variant="secondary" className={`text-${site}`}>
            <Link href="/showcase">See all projects</Link>
          </Button>
        </Hero>

        <div className="h-[600px]"></div>
      </div>
    </Container>
  );
}
