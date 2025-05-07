import React, { forwardRef } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../lib/utils';
import { Text } from '../../../';
import { defaultCategories, type FooterCategoryConfig } from './default-categories';

const footerVariants = cva('bg-black print:bg-transparent py-12 lg:py-18', {
  variants: {
    variant: {
      dark: 'bg-black text-white',
      light: 'bg-slate-100 text-black',
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
});
export interface FooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof footerVariants> {
  message?: {
    title: string;
    text: string;
  };
  categories?: FooterCategoryConfig;
  imageSrc?: string;
  baseUrl?: string;
  showDesignCredits?: boolean;
}

// we can pass a baseurl that gets removed from the links in order to have site specific relative links
const Footer = forwardRef<HTMLDivElement, FooterProps>(
  (
    {
      message = {
        title: 'A project by the xyflow team',
        text: 'We are building and maintaining open source software for node-based UIs since 2019.',
      },
      categories = defaultCategories,
      imageSrc,
      baseUrl = '',
      variant,
      className,
      showDesignCredits = true,
    },
    ref,
  ) => {
    return (
      <footer className={cn(footerVariants({ variant, className }))} ref={ref}>
        <div className="mx-auto lg:flex x:max-w-(--nextra-content-width) pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
          <div className="lg:max-w-[300px] md:max-w-[600px] lg:mr-24 shrink-0">
            {message && (
              <>
                <Text variant="light" className="mb-2">
                  {message.title}
                </Text>
                <div className="font-black text-3xl tracking-tight leading-none mb-6 lg:mb-10">
                  {message.text}
                </div>
              </>
            )}
            {imageSrc && (
              <Image
                src={imageSrc}
                alt="photo of the xyflow team sitting in an office"
                width={300}
                height={136}
              />
            )}
          </div>
          <div className="grow">
            <div className="flex flex-col grow h-[100%]">
              <div className="grid grid-cols-2 lg:grid-cols-4 grid-gap-4">
                {Object.entries(categories).map(([title, items]) => (
                  <div key={title} className="mt-4 lg:mt-0">
                    <Text variant="light" className="text-light mb-2">
                      {title}
                    </Text>
                    {items.map((item) => (
                      <Link
                        href={item.route.replace(baseUrl, '')}
                        className="block"
                        key={item.route}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <Text variant="light" className="pt-6 text-sm mt-auto">
                <a href="mailto:info@xyflow.com">info@xyflow.com</a> — Copyright ©{' '}
                {new Date().getFullYear()}{' '}
                <a href="https://webkid.io" target="_blank">
                  webkid GmbH
                </a>
                . All rights reserved
                {showDesignCredits ? (
                  <>
                    {' '}
                    — website design by{' '}
                    <a target="_blank" href="https://facumontanaro.com/">
                      Facu Montanaro
                    </a>
                  </>
                ) : (
                  '.'
                )}
              </Text>
            </div>
          </div>
        </div>
      </footer>
    );
  },
);

export { Footer, defaultCategories as defaultFooterCategories };
