'use client';

import { TabsTrigger, Text, cn } from '@xyflow/xy-ui';
import { SliderItem } from './types';
import ProgressBar from './progress-bar';

export type ImageSliderItemProps = {
  item: SliderItem;
  isActive: boolean;
  duration?: number;
  onClick: (name: string) => void;
  onComplete: () => void;
};

export default function ImageSliderItem({
  item,
  isActive,
  duration = 1000,
  onClick,
  onComplete,
}: ImageSliderItemProps) {
  return (
    <TabsTrigger
      value={item.name}
      className={cn(
        'w-full sm:flex flex-col group border-none',
        isActive ? 'flex' : 'hidden',
      )}
      onClick={() => onClick(item.name)}
    >
      <div className="h-1.5 rounded bg-black/20 w-full">
        {isActive && (
          <ProgressBar duration={duration} isActive={isActive} onComplete={onComplete} />
        )}
      </div>

      <div
        className={cn(
          'text-muted transition duration-300 motion-reduce:transition-none',
          'group-hover:opacity-100 px-2 md:px-4',
          isActive ? ' opacity-100' : ' opacity-40',
        )}
      >
        <Text className="my-2 font-mono">{item.name}</Text>
        <Text className="leading-snug opacity-80">{item.text}</Text>
      </div>
    </TabsTrigger>
  );
}
