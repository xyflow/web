import { useEffect, useRef } from 'react';
import { getSmoothStepPath } from '@xyflow/system';

const HANDLE_SIZE = 18;

export default function useConnectionDrawer() {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    function drawConnections() {
      if (ref.current) {
        // 1. collect all source handles
        const sourceHandles = ref.current.querySelectorAll('.handle.source');

        // 2. create pairs of handles [sourceHandle, targetHandle]
        const handlePairs = Array.from(sourceHandles).reduce(
          (res, sourceHandle) => {
            const targetHandleId = sourceHandle.getAttribute('data-to');
            const targetHandle = ref.current.querySelector(
              `[data-handleid="${targetHandleId}"`
            );

            if (sourceHandle && targetHandle) {
              res.push([sourceHandle, targetHandle]);
            }

            return res;
          },
          []
        );

        // 3. for each pair of handles, calculate the edge path and update the svg
        handlePairs.forEach(([sourceHandle, targetHandle]) => {
          const fromHandleBounds = sourceHandle.getBoundingClientRect();
          const toHandleBounds = targetHandle.getBoundingClientRect();
          const isRTL = fromHandleBounds.x > toHandleBounds.x;
          const svg = sourceHandle.querySelector('svg');
          const path = svg.querySelector('path');
          const width = Math.max(
            Math.abs(fromHandleBounds.left - toHandleBounds.left),
            2
          );
          const height = Math.abs(fromHandleBounds.top - toHandleBounds.top);

          const isSmallScreen = window.innerWidth <= 768;

          svg.setAttribute('width', Math.max(2, width));
          svg.setAttribute('height', Math.max(2, height));
          svg.style.right =
            isRTL || isSmallScreen ? `${HANDLE_SIZE / 2 - 2}px` : 'auto';
          svg.style.left =
            isRTL || isSmallScreen ? 'auto' : `${HANDLE_SIZE / 2 - 2}px`;
          svg.style.top = `${HANDLE_SIZE / 2 - 2}px`;
          const sourcePosition = sourceHandle.getAttribute('data-position');
          const targetPosition = targetHandle.getAttribute('data-position');

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
        });
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
