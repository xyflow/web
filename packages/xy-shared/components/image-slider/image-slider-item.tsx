'use client';

import { TabsTrigger } from '../ui/tabs';
import { Text } from '../ui/text';
import { cn } from '../../lib/utils';
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
        'group w-full flex-col border-none sm:flex',
        isActive ? 'flex' : 'hidden',
      )}
      onClick={() => onClick(item.name)}
    >
      <div className="h-1.5 w-full rounded bg-black/20">
        {isActive && (
          <ProgressBar duration={duration} isActive={isActive} onComplete={onComplete} />
        )}
      </div>

      <div
        className={cn(
          'text-slate-100 transition duration-300 motion-reduce:transition-none',
          'px-2 group-hover:opacity-100 md:px-4',
          isActive ? 'opacity-100' : 'opacity-40',
        )}
      >
        <Text className="my-2 font-mono">{item.name}</Text>
        <Text className="leading-snug opacity-80">{item.text}</Text>
      </div>
    </TabsTrigger>
  );
}
