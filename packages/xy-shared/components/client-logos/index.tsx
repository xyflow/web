import Image, { StaticImageData } from 'next/image';
import { cn } from '../../lib/utils';
import { Text } from '../ui/text';

type ClientLogo = {
  src: StaticImageData;
  alt: string;
  className?: string;
};

export default function ClientLogos({
  title = 'Used By',
  logos,
  className,
}: {
  title?: string;
  logos: ClientLogo[];
  className?: string;
}) {
  return (
    <div className={cn('flex w-full flex-col items-center', className)}>
      <Text variant="light" className="mb-8">
        {title}
      </Text>
      <div className="grid grid-cols-2 place-items-center gap-8 md:grid-cols-4 md:gap-12">
        {logos.map((logo) => (
          <Image
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            className={cn(
              'w-auto transition-[filter] dark:brightness-0 dark:contrast-200 dark:invert',
              logo.className,
            )}
          />
        ))}
      </div>
    </div>
  );
}
