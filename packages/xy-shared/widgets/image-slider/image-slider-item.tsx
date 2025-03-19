'use client';

import { TabsTrigger, Text, cn } from '@xyflow/xy-ui';
import { SliderItem } from './types';
import ProgressBar from './progress-bar';

export type ImageSliderItemProps = {
  item: SliderItem;
  isActive: boolean;
  activeBarWidth?: number;
  onClick: (name: string) => void;
};

export default function ImageSliderItem({
  item,
  isActive,
  onClick,
  activeBarWidth,
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
      <div className="w-full relative mb-8 h-1.5 rounded bg-black/20">
        {/* I'm sure there's a fancy type way to say that `activeBarWidth` only
            exists when `isActive` is true, but I couldn't work out a nice solution,
            and it's probably over-engineering anyway.
        */}
        {isActive && (
          <ProgressBar
            width={activeBarWidth!}
            className="transition-all duration-200 ease-linear"
          />
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
