import { ReactElement, type ReactNode } from 'react';
import Link from 'next/link';
import { Position } from '@xyflow/react';
import { Heading } from '../ui/heading';
import { Text } from '../ui/text';
import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { cn } from '../../lib/utils';

import { Handle } from '../handle';

const order1Class = 'order-1';
const order2Class = 'order-2';

type FeatureProps = {
  title: ReactNode;
  text: string;
  route: string;
  index: number;
  featureCount: number;
  linkLabel?: string;
  flowComponent: ReactElement;
};

function Feature({
  index,
  featureCount,
  title,
  text,
  route,
  flowComponent,
  linkLabel = 'Read more',
}: FeatureProps) {
  const sourceHandleId = `source-${index}`;
  const nextTargetHandleId = `target-${index + 1}`;
  const targetHandleId = `target-${index}`;

  return (
    <div
      className={cn(
        'relative md:grid md:grid-cols-2 md:gap-8',
        `z-${featureCount - index}`,
        index < featureCount - 1 ? 'mb-16 md:mb-24' : '',
      )}
    >
      <div
        className={cn(
          'mb-4 flex flex-col justify-center',
          index % 2 === 0 ? order1Class : order2Class,
        )}
      >
        <div>
          <Heading size="md" className="mb-4 font-bold">
            {title}
          </Heading>
          <Text className="mb-8 mt-2 max-w-md" variant="light">
            {text}
          </Text>
          <Button asChild>
            <Link href={route} prefetch={false}>
              {linkLabel}
            </Link>
          </Button>
        </div>
      </div>
      <div className={index % 2 === 0 ? order2Class : order1Class}>
        <Container className="relative" innerClassName="overflow-visible rounded-[18px]">
          <div className="h-[300px] overflow-hidden rounded-[18px] from-white to-gray-50 md:h-[400px]">
            {flowComponent}
          </div>

          {index > 0 && (
            <Handle
              id={targetHandleId}
              className="-top-4 left-10 md:left-1/2"
              type="target"
              position={Position.Top}
              handleClassName="border-none bg-transparent"
            />
          )}
          {index < featureCount - 1 && (
            <Handle
              id={sourceHandleId}
              className="-bottom-[18px] right-10 md:left-1/2 md:right-auto"
              handleClassName="shadow-md"
              position={Position.Bottom}
              type="source"
              to={nextTargetHandleId}
            >
              <div className="dark:bg-muted absolute left-1/2 top-0 h-7 w-10 -translate-x-1/2 rounded-b-full bg-gray-50 shadow-md" />
            </Handle>
          )}
        </Container>
      </div>
    </div>
  );
}

export { Feature, type FeatureProps };
