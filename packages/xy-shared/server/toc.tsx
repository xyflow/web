import { FC } from 'react';
import { MdxFile } from 'nextra';
import NextLink from 'next/link';
import { Anchor } from 'nextra/components';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { PlayCircleIcon } from '@heroicons/react/24/outline';

export const TOC: FC<{ pageMap: (MdxFile & { title: string })[] }> = async ({
  pageMap,
}) => {
  return (
    <div className="grid gap-2 text-xs font-medium">
      <Anchor className="xy-link-gray" href="https://xyflow.com/contact">
        Questions? Contact Us
      </Anchor>

      <p className="font-bold mt-4">What&apos;s new?</p>
      {[...pageMap.slice(0, 3), { route: '/whats-new', title: '...and more!' }].map(
        ({ route, title }) => (
          <NextLink
            className="xy-link-gray focus-visible:nextra-focus"
            href={route}
            key={route}
          >
            {title}
          </NextLink>
        ),
      )}
      <Card className="mt-4">
        <CardHeader className="px-3 py-3">
          <CardTitle className="text-lg leading-normal">React Flow Playground</CardTitle>
        </CardHeader>
        <CardContent className="px-3 pt-0 pb-3">
          <p className="text-sm text-muted-foreground">
            Explore different props, options and layout algorithms in our interactive
            playground
          </p>
          <NextLink href="https://play.reactflow.dev" target="_blank">
            <Button size="sm" variant="secondary" className="mt-3 w-full flex gap-x-1">
              <PlayCircleIcon className="w-5 h-5" />
              Launch
            </Button>
          </NextLink>
        </CardContent>
      </Card>
    </div>
  );
};
