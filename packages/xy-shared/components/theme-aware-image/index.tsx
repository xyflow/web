'use client';

import Image, { type ImageProps } from 'next/image';
import { cn } from '../../lib/utils';

type ThemeAwareImageProps = Omit<ImageProps, 'src'> & {
  lightSrc: ImageProps['src'];
  darkSrc?: ImageProps['src'];
};

export function ThemeAwareImage({
  lightSrc,
  darkSrc,
  className,
  ...props
}: ThemeAwareImageProps) {
  if (!darkSrc) {
    return <Image {...props} className={className} src={lightSrc} />;
  }

  return (
    <>
      <Image {...props} className={cn('hidden dark:block', className)} src={darkSrc} />
      <Image {...props} className={cn('block dark:hidden', className)} src={lightSrc} />
    </>
  );
}
