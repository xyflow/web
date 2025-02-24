import { FC } from 'react';
import { MdxFile } from 'nextra';
import NextLink from 'next/link';
import { Anchor } from 'nextra/components';

export const TOC: FC<{ pageMap: (MdxFile & { title: string })[] }> = async ({
  pageMap,
}) => {
  return (
    <div className="grid gap-2 x:text-xs x:font-medium">
      <Anchor className="xy-link-gray" href="https://xyflow.com/contact">
        Question? Give us feedback
      </Anchor>
      <p className="font-bold mt-4">What&apos;s new?</p>
      {[
        ...pageMap.slice(0, 3),
        { route: '/whats-new', title: '...and more!' },
      ].map(({ route, title }) => (
        <NextLink
          className="xy-link-gray x:focus-visible:nextra-focus"
          href={route}
          key={route}
        >
          {title}
        </NextLink>
      ))}
    </div>
  );
};
