'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
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
  const [elapsed, setElapsed] = useState(0);
  const [shouldCycle, setShouldCycle] = useState(Boolean(duration));
  const activeBarWidth = useMemo(
    () => (shouldCycle ? (elapsed / duration) * 100 : 100),
    [elapsed, duration, shouldCycle],
  );

  // Called whenever a tab is manually navigated to. We want to pause the cycle
  // and give the user a chance to read the content.
  const onValueChange = useCallback((value: string) => {
    setActive(value);
    setElapsed(0);
    setShouldCycle(false);
  }, []);
  // Once the timer for a tab has elapsed, this function is called to move on
  // to the next one and reset the elapsed time. If the user has manually
  // navigated to a tab, this also gets called when resuming the cycle.
  const setNext = useCallback(() => {
    const index = items.findIndex((item) => item.name === active);
    const nextIndex = (index + 1) % items.length;

    setActive(items[nextIndex].name);
    setElapsed(0);
  }, [active, items]);

  useEffect(() => {
    if (!shouldCycle && duration) {
      const resume = setTimeout(() => {
        setNext();
        setShouldCycle(true);
      }, 1000 * 10);

      return () => clearTimeout(resume);
    }

    let animationFrameId: number;

    const updateElapsed = () => {
      setElapsed((prev) => {
        const nextElapsed = prev + 16.66;
        if (nextElapsed >= duration) {
          setNext();
          return 0;
        }
        return nextElapsed;
      });

      if (shouldCycle) {
        animationFrameId = window.requestAnimationFrame(updateElapsed);
      }
    };

    if (shouldCycle) {
      animationFrameId = window.requestAnimationFrame(updateElapsed);
    }

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [duration, shouldCycle, setNext]);

  return (
    <Tabs value={active} onValueChange={onValueChange} className="relative">
      {/* Using `aspect-video` on smaller devices means we don't end up with
          weirdly large images. On bigger displays we just fix the image size to
          40vh. 
      */}
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
            activeBarWidth={active === item.name ? activeBarWidth : undefined}
            onClick={onValueChange}
          />
        ))}
      </TabsList>
    </Tabs>
  );
}
