'use client';

import Link from 'next/link';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Position } from '@xyflow/react';
import { Text } from '../components/ui/text';
import { Hero } from '../components/hero';
import { HeadlineNode } from '../components/headline-node';
import { Handle } from '../components/handle';

import { BaseLayout } from './base';

export type NotFoundLayoutProps = {
  children?: React.ReactNode;
};

export function NotFoundLayout({ children }: NotFoundLayoutProps) {
  return (
    <BaseLayout>
      <Hero
        title={
          <div className="mt-12 flex justify-center gap-12 pb-24 lg:mt-32 lg:gap-24 lg:text-[5ch]">
            <HeadlineNode>
              4
              <Handle
                type="target"
                position={Position.Right}
                id="4-target"
                className="-right-[8px] top-1/2"
                handleWidthClass="w-4"
                handleHeightClass="h-8"
                handleClassName="border-none bg-primary"
                dashed={false}
              />
            </HeadlineNode>
            <HeadlineNode className="-top-14">
              0
              <Handle
                type="source"
                position={Position.Left}
                className="-left-[8px] top-1/2"
                handleClassName="border-none bg-primary"
                handleWidthClass="w-4"
                handleHeightClass="h-8"
                id="0-source"
                to="4-target"
                svgClassName="stroke-primary"
                dashed={false}
              />
              <Handle
                type="source"
                position={Position.Right}
                className="-right-[8px] top-1/2"
                handleClassName="border-none bg-primary"
                handleWidthClass="w-4"
                handleHeightClass="h-8"
                id="0.1-source"
                to="4.1-target"
                svgClassName="stroke-primary"
                dashed={false}
              />
            </HeadlineNode>
            <HeadlineNode className="top-8">
              4
              <Handle
                type="target"
                position={Position.Left}
                id="4.1-target"
                className="-left-[8px] top-1/2"
                handleClassName="border-none bg-primary"
                handleWidthClass="w-4"
                handleHeightClass="h-8"
                dashed={false}
              />
            </HeadlineNode>
          </div>
        }
        align="center"
        size="xl"
        backgroundVariant="gradient"
      >
        <div className="-mt-[40px] flex flex-col items-center">
          <Text size="lg" className="block">
            We couldn&apos;t find that page.
          </Text>
          <Link href="/">
            <Text>
              Go Home <ArrowRightCircleIcon className="ml-1 inline h-6 w-6" />
            </Text>
          </Link>
        </div>

        <div>{children}</div>
      </Hero>
    </BaseLayout>
  );
}
