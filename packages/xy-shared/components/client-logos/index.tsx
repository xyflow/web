import Image, { StaticImageData } from 'next/image';
import { Text, cn } from '../../';

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
    <div className={cn('flex flex-col items-center w-full', className)}>
      <Text variant="light" className="mb-8">
        {title}
      </Text>
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-12 gap-8 place-items-center">
        {logos.map((logo) => (
          <Image
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            className={cn('w-auto', logo.className)}
          />
        ))}
      </div>
    </div>
  );
}
