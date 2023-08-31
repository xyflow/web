import { useEffect, useRef } from 'react';
import { getSmoothStepPath } from '@xyflow/system';

export default function useConnectionDrawer() {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    function drawConnections() {
      if (ref.current) {
        const handlesVisible = window.innerWidth >= 900;
        const targetHandles = Array.from(
          ref.current.querySelectorAll('.port.target')
        );

        // 1. collect all source handles
        const sourceHandles = Array.from(
          ref.current.querySelectorAll('.port.source')
        );

        [...sourceHandles, ...targetHandles].forEach(
          (handle: HTMLDListElement) => {
            handle.style.display = handlesVisible ? 'block' : 'none';
          }
        );

        if (!handlesVisible) {
          return;
        }

        // 2. create pairs of handles [sourceHandle, targetHandle]
        const handlePairs = sourceHandles.reduce((res, sourceHandle) => {
          const targetHandleId = sourceHandle.getAttribute('data-to');
          const targetHandle = ref.current.querySelector(
            `[data-portid="${targetHandleId}"`
          );

          if (sourceHandle && targetHandle) {
            res.push([sourceHandle, targetHandle]);
          }

          return res;
        }, []);

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

          const handleHeight = fromHandleBounds.height;
          const handleWidth = fromHandleBounds.width;

          svg.setAttribute('width', Math.max(2, width));
          svg.setAttribute('height', Math.max(2, height));
          svg.style.right =
            isRTL || isSmallScreen ? `${handleWidth / 2 - 1}px` : 'auto';
          svg.style.left =
            isRTL || isSmallScreen ? 'auto' : `${handleWidth / 2 - 1}px`;
          svg.style.top = `${handleHeight / 2 - 1}px`;
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
