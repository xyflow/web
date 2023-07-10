import Link from 'next/link';
import { Position } from '@xyflow/system';

import { Heading, Text, Button, Container, cn } from 'xy-ui';
import Handle from '@/components/handle';

const order1Class = 'order-1';
const order2Class = 'order-2';

const zIndexClasses = {
  0: 'z-[0]',
  1: 'z-[1]',
  2: 'z-[2]',
  3: 'z-[3]',
  4: 'z-[4]',
  5: 'z-[5]',
  6: 'z-[6]',
};

export type FeatureProps = {
  title: string;
  text: string;
  route: string;
};

export default function Feature({
  index,
  featureCount,
  variant = 'react',
  title,
  text,
  route,
}: {
  index: number;
  featureCount: number;
  variant?: 'react' | 'svelte' | 'xyflow';
} & FeatureProps) {
  const sourceHandleId = `source-${index}`;
  const nextTargetHandleId = `target-${index + 1}`;
  const targetHandleId = `target-${index}`;

  return (
    <div
      className={cn(
        'relative md:grid md:grid-cols-2 md:gap-8 mb-16 md:mb-24',
        zIndexClasses[featureCount - index]
      )}
    >
      <div
        className={cn(
          'flex flex-col justify-center mb-4',
          index % 2 === 0 ? order1Class : order2Class
        )}
      >
        <div>
          <Heading size="lg" className="font-bold">
            {title}
          </Heading>
          <Text className="mb-4 mt-2">{text}</Text>
          <Button asChild>
            <Link href={route}>Read more</Link>
          </Button>
        </div>
      </div>
      <div className={index % 2 === 0 ? order2Class : order1Class}>
        <Container className="relative">
          <div className="h-[400px] p-6"></div>

          {index > 0 && (
            <Handle
              id={targetHandleId}
              variant={variant}
              className="top-4 left-10 md:left-1/2"
              type="target"
              position={Position.Top}
            />
          )}
          {index < featureCount - 1 && (
            <Handle
              id={sourceHandleId}
              variant={variant}
              className="bottom-4 right-10 md:left-1/2 md:right-auto"
              position={Position.Bottom}
              type="source"
              to={nextTargetHandleId}
            />
          )}
        </Container>
      </div>
    </div>
  );
}
