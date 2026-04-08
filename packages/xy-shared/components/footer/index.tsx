import React, { forwardRef } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';
import { Text } from '../ui/text';
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
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof footerVariants> {
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
        <div className="x:max-w-(--nextra-content-width) mx-auto pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)] lg:flex">
          <div className="shrink-0 md:max-w-[600px] lg:mr-24 lg:max-w-[300px]">
            {message && (
              <>
                <Text variant="light" className="mb-2">
                  {message.title}
                </Text>
                <div className="mb-6 text-3xl font-black leading-none tracking-tight lg:mb-10">
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
            <div className="flex h-[100%] grow flex-col">
              <div className="grid-gap-4 grid grid-cols-2 lg:grid-cols-4">
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

              <Text variant="light" className="mt-auto pt-6 text-sm">
                <a href="mailto:info@xyflow.com">info@xyflow.com</a> — Copyright ©{' '}
                {new Date().getFullYear()}{' '}
                <a href="https://webkid.io" target="_blank" rel="noopener noreferrer">
                  webkid GmbH
                </a>
                . All rights reserved
                {showDesignCredits ? (
                  <>
                    {' '}
                    — website design by{' '}
                    <a
                      target="_blank"
                      href="https://facumontanaro.com/"
                      rel="noopener noreferrer"
                    >
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

Footer.displayName = 'Footer';

export { Footer, defaultCategories as defaultFooterCategories };
