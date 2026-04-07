import Link from 'next/link';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { Heading } from '../ui/heading';
import { Button } from '../ui/button';
import { Section } from '../ui/section';
import { getFramework } from '../../lib/get-framework';

const { library } = getFramework();

type SubscribeSectionProps = {
  btnLink?: string;
  btnLabel?: React.ReactNode;
};

function SubscribeSection({
  btnLink = '/pro',
  btnLabel,
}: SubscribeSectionProps) {
  return (
    <Section className="mx-auto lg:max-w-[800px]">
      <Heading size="sm" as="h3" className="text-center mb-12 mt-32">
        Get Pro examples, prioritized bug reports, 1:1 support from the maintainers, and
        more with {library} Pro
      </Heading>
      {/* using fallback + text-[hsl(var(--primary))]! allows us to fix issues with xyflow.dev by simply adding fallback as a class to the parent element*/}
      <div className="flex justify-center space-x-8 fallback">
        <Button size="lg" asChild variant="pro">
          <Link href={btnLink} className="flex items-center text-[hsl(var(--primary))]!">
            <SparklesIcon className="w-5 h-5 mr-1" />
            {btnLabel || `${library} Pro`}
          </Link>
        </Button>
      </div>
    </Section>
  );
}

export { SubscribeSection, type SubscribeSectionProps };
