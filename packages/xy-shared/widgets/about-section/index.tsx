import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';

import { Section, Heading, Text, Button, cn } from '@xyflow/xy-ui';

type AboutSectionProps = {
  imageSrc?: string | StaticImageData;
  colorizeImage?: boolean;
};

function AboutSection({ imageSrc, colorizeImage = true }: AboutSectionProps) {
  return (
    <Section>
      <Heading size="sm" className="text-center mb-2">
        A project by the xyflow team
      </Heading>
      <Text className="text-center max-w-xl mx-auto mb-6" variant="light">
        We are Christopher, Peter, Abbey and Moritz. We are the maintainers of
        React Flow, Svelte Flow, and the communities around them
      </Text>

      <div className="flex flex-wrap justify-center space-x-8 mb-16">
        <Button asChild variant="link">
          <Link href="https://xyflow.com/blog" className="flex items-center">
            Blog <ArrowRightCircleIcon className="w-4 h-4 ml-1" />
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="https://xyflow.com/about" className="flex items-center">
            About us <ArrowRightCircleIcon className="w-4 h-4 ml-1" />
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link
            href="https://xyflow.com/open-source"
            className="flex items-center"
          >
            Open Source <ArrowRightCircleIcon className="w-4 h-4 ml-1" />
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link href="https://xyflow.com/contact" className="flex items-center">
            Contact Us <ArrowRightCircleIcon className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>

      {imageSrc && (
        <div
          className={cn('rounded-3xl overflow-hidden', {
            'bg-primary/40': colorizeImage,
          })}
        >
          <Image
            className="grayscale mix-blend-multiply"
            src={imageSrc}
            alt="photo of the xyflow team"
          />
        </div>
      )}
    </Section>
  );
}

export { AboutSection, type AboutSectionProps };
