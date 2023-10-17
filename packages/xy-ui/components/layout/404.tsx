import Link from 'next/link';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import { Position } from 'reactflow';

import { BaseLayout, HeadlineNode, Handle, Hero, Text } from '../../';
// import BaseLayout from '@/layouts/base';
// import HeadlineNode from '@/components/headline-node';
// import Handle from '@/components/handle';
// import Hero from '@/page-sections/hero';

export type NotFoundLayoutProps = {
  children?: React.ReactNode;
};

export function NotFoundLayout({ children }: NotFoundLayoutProps) {
  return (
    <BaseLayout>
      <Hero
        title={
          <div className="flex justify-center gap-12 lg:gap-24 lg:text-[5ch] mt-12 lg:mt-32 pb-24">
            <HeadlineNode>
              4
              <Handle
                type="target"
                position={Position.Right}
                id="4-target"
                className="top-1/2 -right-[8px]"
                handleWidthClass="w-4"
                handleHeightClass="h-8"
                handleClassName="border-none bg-purple-600"
                dashed={false}
              />
            </HeadlineNode>
            <HeadlineNode className="-top-14">
              0
              <Handle
                type="source"
                position={Position.Left}
                className="top-1/2 -left-[8px]"
                handleClassName="border-none bg-purple-600"
                handleWidthClass="w-4"
                handleHeightClass="h-8"
                id="0-source"
                to="4-target"
                svgClassName="stroke-purple-600"
                dashed={false}
              />
              <Handle
                type="source"
                position={Position.Right}
                className="top-1/2 -right-[8px]"
                handleClassName="border-none bg-purple-500"
                handleWidthClass="w-4"
                handleHeightClass="h-8"
                id="0.1-source"
                to="4.1-target"
                svgClassName="stroke-purple-500"
                dashed={false}
              />
            </HeadlineNode>
            <HeadlineNode className="top-8">
              4
              <Handle
                type="target"
                position={Position.Left}
                id="4.1-target"
                className="top-1/2 -left-[8px]"
                handleClassName="border-none bg-purple-500"
                handleWidthClass="w-4"
                handleHeightClass="h-8"
                dashed={false}
              />
            </HeadlineNode>
          </div>
        }
        align="center"
        size="xl"
        showGradient
      >
        <div className="flex flex-col items-center -mt-[40px]">
          <Text size="lg" className="block">
            We couldn't find that page.
          </Text>
          <Link href="/">
            <Text>
              Go Home <ArrowRightCircleIcon className="inline w-6 h-6 ml-1" />
            </Text>
          </Link>
        </div>

        <div>{children}</div>
      </Hero>
    </BaseLayout>
  );
}
