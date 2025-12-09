import Link from 'next/link';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { Heading } from '../ui/heading';
import { Button } from '../ui/button';
import { Section } from '../ui/section';

type SubscribeSectionProps = {
  btnLink?: string;
  btnLabel?: React.ReactNode;
};

function SubscribeSection({
  btnLink = '/pro',
  btnLabel = 'React Flow Pro',
}: SubscribeSectionProps) {
  return (
    <Section className="mx-auto lg:max-w-[800px]">
      <Heading size="sm" as="h3" className="text-center mb-12 mt-32">
        Get Pro examples, prioritized bug reports, 1:1 support from the maintainers, and
        more with React Flow Pro
      </Heading>

      <div className="flex justify-center space-x-8">
        <Button size="lg" asChild variant="pro">
          <Link href={btnLink} className="flex items-center">
            <SparklesIcon className="w-5 h-5 mr-1" />
            {btnLabel}
          </Link>
        </Button>
      </div>
    </Section>
  );
}

export { SubscribeSection, type SubscribeSectionProps };
