import Link from 'next/link';
import { Position } from '@xyflow/system';

import { Heading, Text, Button, Container, cn } from 'xy-ui';
import Handle from '@/components/handle';
import { ReactNode } from 'react';

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
  title: ReactNode;
  text: string;
  route: string;
};

export default function Feature({
  index,
  featureCount,
  title,
  text,
  route,
  flowComponent: FlowComponent = () => null,
}: {
  index: number;
  featureCount: number;
  flowComponent?: React.ComponentType;
} & FeatureProps) {
  const sourceHandleId = `source-${index}`;
  const nextTargetHandleId = `target-${index + 1}`;
  const targetHandleId = `target-${index}`;

  return (
    <div
      className={cn(
        'relative md:grid md:grid-cols-2 md:gap-8 ',
        zIndexClasses[featureCount - index],
        index < featureCount - 1 ? 'mb-16 md:mb-24' : ''
      )}
    >
      <div
        className={cn(
          'flex flex-col justify-center mb-4',
          index % 2 === 0 ? order1Class : order2Class
        )}
      >
        <div>
          <Heading size="md" className="font-bold mb-4">
            {title}
          </Heading>
          <Text className="mb-8 mt-2" variant="light">
            {text}
          </Text>
          <Button asChild>
            <Link href={route}>Read more</Link>
          </Button>
        </div>
      </div>
      <div className={index % 2 === 0 ? order2Class : order1Class}>
        <Container className="relative" innerClassName="overflow-visible">
          <div className="h-[400px] rounded-[18px] overflow-hidden bg-gradient-to-br from-white to-gray-50">
            <FlowComponent />
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
              <div className="bg-gray-50 rounded-b-full shadow-md absolute w-10 h-7 left-1/2 -translate-x-1/2 top-0" />
            </Handle>
          )}
        </Container>
      </div>
    </div>
  );
}
