import Link from 'next/link';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/button';
import { Text } from '../../components/ui/text';
import { Container } from '../../components/ui/container';

import { LayoutBreakout } from '../breakout';
import { AppWindow } from './app-window';

type GettingStartedProps = {
  libraryName: string;
  packageName: string;
};

function GettingStarted({ libraryName, packageName }: GettingStartedProps) {
  return (
    <LayoutBreakout className="x:max-w-(--nextra-content-width) !mt-0 lg:left-0 lg:right-0 lg:ml-0 lg:mr-0 lg:w-full">
      <Container
        variant="dark"
        className="mt-16 rounded-none border-none p-0 lg:mt-24 lg:rounded-3xl lg:p-1.5"
        innerClassName="rounded-none border-none lg:rounded-[18px] lg:border-solid lg:border-gray-700"
      >
        <div className="px-4 pb-4 pt-12">
          <Text size="lg" className="text-primary mb-2 text-center font-bold">
            Getting Started with {libraryName}
          </Text>
          <Text className="mx-auto mb-6 max-w-lg text-center lg:mb-8">
            Make sure you&apos;ve installed npm, pnpm or yarn. Then you can install{' '}
            {libraryName} via:
          </Text>

          <AppWindow>
            <div className="text-md inline !pl-0 font-mono">
              npm install <span className="text-primary">{packageName}</span>
            </div>
          </AppWindow>
        </div>

        <div className="mt-5 flex justify-center border-t border-gray-700 bg-black/90 py-3">
          <Button variant="link" className="font-bold text-white" asChild>
            <Link href={`/learn`}>
              See full Quickstart guide{' '}
              <ArrowLongRightIcon className="ml-2 h-4 w-4 stroke-2" />
            </Link>
          </Button>
        </div>
      </Container>
    </LayoutBreakout>
  );
}

export { GettingStarted, type GettingStartedProps };
