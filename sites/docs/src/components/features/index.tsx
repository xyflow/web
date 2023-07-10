'use client';

import { useEffect, useRef } from 'react';
import { Position, getSmoothStepPath } from '@xyflow/system';
import Feature, { FeatureProps } from './feature';

type FeatureSectionProps = {
  features: FeatureProps[];
  className?: string;
  variant?: 'react' | 'svelte' | 'xyflow';
};

const HANDLE_SIZE = 18;

export default function FeatureSection({
  features,
  variant = 'react',
  className,
}: FeatureSectionProps) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    function redrawEdges() {
      if (ref.current) {
        // 1. collect all handles within the feature section
        const handles = ref.current.querySelectorAll('.handle');

        // 2. create pairs of handles [fromHandle, toHandle]
        const handlePairs = Array.from(handles).reduce(
          (res, handle, i, handles) => {
            if (i >= handles.length - 1 || i % 2 === 1) {
              return res;
            }

            const fromHandle = handle;
            const toHandle = handles[i + 1];

            res.push([fromHandle, toHandle]);

            return res;
          },
          []
        );

        // 3. for each pair of handles, calculate the edge path and update the svg
        handlePairs.forEach((pair, index) => {
          const isEven = index % 2 === 0;
          const fromHandleBounds = pair[0].getBoundingClientRect();
          const toHandleBounds = pair[1].getBoundingClientRect();
          const svg = pair[0].querySelector('svg');
          const path = svg.querySelector('path');
          const width = Math.max(
            Math.abs(fromHandleBounds.left - toHandleBounds.left),
            2
          );
          const height =
            Math.abs(fromHandleBounds.top - toHandleBounds.top) - HANDLE_SIZE;
          const isSmallScreen = window.innerWidth <= 768;

          svg.setAttribute('width', width);
          svg.setAttribute('height', height);
          svg.style.right =
            isEven || isSmallScreen ? `${HANDLE_SIZE / 2 - 2}px` : 'auto';
          svg.style.left =
            isEven || isSmallScreen ? 'auto' : `${HANDLE_SIZE / 2 - 2}px`;
          svg.style.top = `${HANDLE_SIZE - 2}px`;

          const [edgePath] = getSmoothStepPath({
            sourceX: isEven || isSmallScreen ? width : 0,
            sourceY: 0,
            targetX: isEven || isSmallScreen ? 0 : width,
            targetY: height,
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
            borderRadius: 24,
          });

          path.setAttribute('d', edgePath);
        });
      }
    }

    redrawEdges();

    window.addEventListener('resize', redrawEdges);

    return () => {
      window.removeEventListener('resize', redrawEdges);
    };
  }, []);

  return (
    <div className={className} ref={ref}>
      {features.map((feature, index) => (
        <Feature
          key={`feature-${index}`}
          variant={variant}
          featureCount={features.length}
          index={index}
          {...feature}
        />
      ))}
    </div>
  );
}
