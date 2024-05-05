import { useEffect, useState } from 'react';
import { Node, useReactFlow } from 'reactflow';

export type FocusParams = {
  id: string;
  includeChildren?: boolean;
  duration?: number;
  then?: [number, () => void][];
};

export const useFocus = ({
  id,
  includeChildren,
  duration = 500,
  then,
}: FocusParams) => {
  const { getNodes, fitView } = useReactFlow();
  const predelay = 50;

  useEffect(() => {
    let actions = then ? [...then] : [];
    let timer = window.setTimeout(() => {
      fitView({
        padding: 0.5,
        duration: duration,
        includeHiddenNodes: true,
        nodes: includeChildren
          ? getNodes().filter((node) => node.id.startsWith(id))
          : [{ id }],
      });

      const next = () => {
        if (!actions.length) return;
        const [delay, action] = actions.shift();

        timer = window.setTimeout(() => {
          action();
          next();
        }, delay);
      };

      timer = window.setTimeout(next, duration);
    }, predelay);

    return () => window.clearTimeout(timer);
  }, [id, fitView]);
};
