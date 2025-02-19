'use client';

import { useEffect, useRef } from 'react';
import { getSmoothStepPath, type Position } from '@xyflow/react';

export function useConnectionDrawer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function drawConnections() {
      if (ref.current) {
        const handlesVisible = window.innerWidth >= 900;
        const { targetHandles, sourceHandles } = collectHandles(ref.current);

        for (const handle of [...sourceHandles, ...targetHandles]) {
          handle.style.display = handlesVisible ? 'block' : 'none';
        }

        if (!handlesVisible) {
          return;
        }

        for (const pair of createMatchedPairs(ref.current, sourceHandles)) {
          const [sourceHandle, targetHandle] = pair;
          const fromHandleBounds = sourceHandle.getBoundingClientRect();
          const toHandleBounds = targetHandle.getBoundingClientRect();
          const isRTL = fromHandleBounds.x > toHandleBounds.x;
          const svg = sourceHandle.querySelector('svg')!;
          const path = svg.querySelector('path')!;
          const width = Math.max(
            Math.abs(fromHandleBounds.left - toHandleBounds.left),
            2,
          );
          const height = Math.abs(fromHandleBounds.top - toHandleBounds.top);

          const isSmallScreen = window.innerWidth <= 768;

          const handleHeight = fromHandleBounds.height;
          const handleWidth = fromHandleBounds.width;

          svg.setAttribute('width', `${Math.max(2, width)}`);
          svg.setAttribute('height', `${Math.max(2, height)}`);
          svg.style.right =
            isRTL || isSmallScreen ? `${handleWidth / 2 - 1}px` : 'auto';
          svg.style.left =
            isRTL || isSmallScreen ? 'auto' : `${handleWidth / 2 - 1}px`;
          svg.style.top = `${handleHeight / 2 - 1}px`;
          const sourcePosition = sourceHandle.getAttribute(
            'data-position',
          ) as Position;
          const targetPosition = targetHandle.getAttribute(
            'data-position',
          ) as Position;

          // TODO: this try-catch block fix TypeError: Cannot read properties of undefined (reading 'x')
          // error on landing page of xyflow.com
          try {
            const [edgePath] = getSmoothStepPath({
              sourceX: isRTL || isSmallScreen ? width : 0,
              sourceY: 0,
              targetX: isRTL || isSmallScreen ? 0 : width,
              targetY: height,
              sourcePosition: sourcePosition,
              targetPosition: targetPosition,
              borderRadius: 24,
            });

            path.setAttribute('d', edgePath);
          } catch (error) {
            console.error(error);
          }
        }
      }
    }

    drawConnections();

    window.addEventListener('resize', drawConnections);

    return () => {
      window.removeEventListener('resize', drawConnections);
    };
  }, []);

  return ref;
}

function collectHandles(container: HTMLElement): {
  targetHandles: HTMLElement[];
  sourceHandles: HTMLElement[];
} {
  return {
    targetHandles: Array.from(container.querySelectorAll('.port.target')),
    sourceHandles: Array.from(container.querySelectorAll('.port.source')),
  };
}

function createMatchedPairs(
  container: HTMLElement,
  sourceHandles: HTMLElement[],
): [HTMLElement, HTMLElement][] {
  const pairs: [HTMLElement, HTMLElement][] = [];

  for (const sourceHandle of sourceHandles) {
    const targetHandleId = sourceHandle.getAttribute('data-to')!;
    const targetHandle = container.querySelector<HTMLElement>(
      `[data-portid="${targetHandleId}"`,
    );

    if (sourceHandle && targetHandle) {
      pairs.push([sourceHandle, targetHandle]);
    }
  }

  return pairs;
}
