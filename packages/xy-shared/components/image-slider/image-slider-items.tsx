'use client';

import { useState, useCallback, useEffect } from 'react';
import { Tabs, TabsContent, TabsList } from '../ui/tabs';
import { cn } from '../../lib/utils';

import { SliderItem } from './types';
import ImageSliderItem from './image-slider-item';

export type ImageSliderItemsProps = {
  items: SliderItem[];
  start?: string;
  duration?: number;
};

export default function ImageSliderItems({
  items,
  duration = 1000,
  start,
}: ImageSliderItemsProps) {
  const [active, setActive] = useState(start ?? items[0].name);
  const [shouldCycle, setShouldCycle] = useState(Boolean(duration));

  const setNext = useCallback(() => {
    const index = items.findIndex((item) => item.name === active);
    const nextIndex = (index + 1) % items.length;
    setActive(items[nextIndex].name);
  }, [active, items]);

  const onValueChange = useCallback((value: string) => {
    setActive(value);
    setShouldCycle(false);
  }, []);

  useEffect(() => {
    if (!shouldCycle && duration) {
      const resume = setTimeout(() => {
        setShouldCycle(true);
      }, 1000 * 10);

      return () => clearTimeout(resume);
    }
  }, [shouldCycle, duration]);

  return (
    <Tabs value={active} onValueChange={onValueChange} className="relative">
      <div className="relative mx-auto aspect-video sm:aspect-auto sm:h-[40vh]">
        {items.map((item, index) => (
          <TabsContent
            key={index}
            forceMount
            value={item.name}
            className="absolute h-full w-full"
          >
            <div
              className={cn(
                'relative h-full transition duration-300 motion-reduce:transition-none',
                active === item.name ? 'opacity-100 ease-out' : 'opacity-0 ease-in',
              )}
            >
              {item.content}
            </div>
          </TabsContent>
        ))}
      </div>

      <TabsList className="mt-8 flex justify-around gap-8 border-none bg-transparent">
        {items.map((item, index) => (
          <ImageSliderItem
            key={index}
            item={item}
            isActive={active === item.name}
            duration={duration}
            onClick={onValueChange}
            onComplete={setNext}
          />
        ))}
      </TabsList>
    </Tabs>
  );
}
