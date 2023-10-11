import Link from 'next/link';

import { Button, Text, Container, cn } from '../../..';
import { AppWindow } from './app-window';
import {
  ArrowLongRightIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

type GettingStartedProps = {
  libraryName: string;
  packageName: string;
};

function GettingStarted({ libraryName, packageName }: GettingStartedProps) {
  return (
    <Container variant="dark" className="mt-16 lg:mt-24">
      <div className="pt-14">
        <Text size="lg" className="font-bold mb-2 text-center text-primary">
          Getting Started with {libraryName}
        </Text>
        <Text className="text-center max-w-lg mx-auto mb-6 lg:mb-8">
          Make sure you’ve installed npm, pnpm or yarn. Then you can install{' '}
          {libraryName} via:
        </Text>

        <AppWindow>
          <pre className="!pl-0">
            <code className="inline text-md">
              npm install <span className="text-primary">{packageName}</span>
            </code>
          </pre>
        </AppWindow>

        <div className="flex justify-center mt-5 py-3 bg-black/90 border-t border-gray-700">
          <Button variant="link" className="text-white font-bold" asChild>
            <Link href={`/learn`}>
              See full Quickstart guide{' '}
              <ArrowLongRightIcon className="ml-2 w-4 h-4 stroke-2" />
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}

export { GettingStarted, type GettingStartedProps };
