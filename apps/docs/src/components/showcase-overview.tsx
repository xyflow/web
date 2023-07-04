import Link from 'next/link';

import { Button, Container } from 'xy-ui';
import HeroSection from '@/components/hero-section';

export default function ShowcaseOverview() {
  return (
    <Container variant="dark">
      <div className="p-14">
        <HeroSection
          title="Used by thousands of people"
          kicker="Project Showcase"
        >
          <p className="mt-4 mb-4">
            From solo open-source developers, to companies like Stripe and
            Typeform. We’ve seen the library used for data processing tools,
            chatbot builders, machine learning, musical synthezisers, and more.
          </p>
          <Button asChild variant="secondary">
            <Link href="/showcase">See all projects</Link>
          </Button>
        </HeroSection>

        <div className="h-[600px]"></div>
      </div>
    </Container>
  );
}
