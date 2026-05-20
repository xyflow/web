import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

import { Section } from '../components/ui/section';
import { Heading } from '../components/ui/heading';
import { Text } from '../components/ui/text';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

type AboutSectionProps = {
  imageSrc?: string | StaticImageData;
  colorizeImage?: boolean;
};

function AboutSection({ imageSrc, colorizeImage = true }: AboutSectionProps) {
  return (
    <Section>
      <Heading size="sm" className="mb-2 text-center">
        A project by xyflow
      </Heading>
      <Text className="mx-auto mb-6 max-w-xl text-center" variant="light">
        We are xyflow, a small team of passionate developers based in Berlin. We are the
        maintainers of React Flow, Svelte Flow, and the communities around them.
      </Text>

      <div className="mb-16 flex flex-wrap justify-center space-x-8">
        <Button asChild variant="link">
          <Link href="https://xyflow.com/blog" className="flex items-center">
            Blog <ArrowRightCircleIcon className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="https://xyflow.com/about" className="flex items-center">
            About us <ArrowRightCircleIcon className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="https://xyflow.com/open-source" className="flex items-center">
            Open Source <ArrowRightCircleIcon className="ml-1 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="https://xyflow.com/contact" className="flex items-center">
            Contact Us <ArrowRightCircleIcon className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {imageSrc && (
        <div
          className={cn('overflow-hidden rounded-3xl', {
            'bg-primary/40': colorizeImage,
          })}
        >
          <Image
            className="mix-blend-multiply grayscale"
            src={imageSrc}
            alt="photo of the xyflow team"
          />
        </div>
      )}
    </Section>
  );
}

export { AboutSection, type AboutSectionProps };
