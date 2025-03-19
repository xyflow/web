'use client';

import { useState, useCallback, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, cn } from '@xyflow/xy-ui';

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
    console.log('Moving to the next item!'); // Log when setNext is called
    const index = items.findIndex((item) => item.name === active);
    const nextIndex = (index + 1) % items.length;
    setActive(items[nextIndex].name);
  }, [active, items]);

  const onValueChange = useCallback((value: string) => {
    console.log('Tab manually changed to:', value); // Log when a tab is manually changed
    setActive(value);
    setShouldCycle(false);
  }, []);

  useEffect(() => {
    if (!shouldCycle && duration) {
      const resume = setTimeout(() => {
        console.log('Resuming auto-cycling!'); // Log when auto-cycling resumes
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
            className="h-full w-full absolute"
          >
            <div
              className={cn(
                'transition duration-300 motion-reduce:transition-none h-full relative',
                active === item.name ? 'ease-out opacity-100' : 'ease-in opacity-0',
              )}
            >
              {item.content}
            </div>
          </TabsContent>
        ))}
      </div>

      <TabsList className="flex justify-around gap-8 mt-8 bg-transparent border-none">
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
