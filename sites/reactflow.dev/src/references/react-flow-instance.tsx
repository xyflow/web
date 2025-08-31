import type { FC } from 'react';
import { useMDXComponents as getMDXComponents } from '@/mdx-components';

const INTERSECTION_FIELDS = ['getIntersectingNodes', 'isNodeIntersecting'];
const VIEWPORT_FIELDS = ['viewportInitialized', 'fitView'];

export const NodesAndEdgesFields: FC = () => {
  const { APIDocs } = getMDXComponents() as unknown as { APIDocs: FC<{ code?: string }> };
  return (
    <APIDocs
      code={`
import type { ReactFlowInstance, ViewportHelperFunctions } from '@xyflow/react'

type $ = Omit<
  ReactFlowInstance,
  ${[...INTERSECTION_FIELDS, ...VIEWPORT_FIELDS].map((v) => `"${v}"`).join('|')}
  |
  keyof ViewportHelperFunctions
>

export default $`}
    />
  );
};

export const IntersectionFields: FC = () => {
  const { APIDocs } = getMDXComponents() as unknown as { APIDocs: FC<{ code?: string }> };
  return (
    <APIDocs
      code={`
import type { ReactFlowInstance } from '@xyflow/react'

type $ = Pick<
  ReactFlowInstance,
  ${INTERSECTION_FIELDS.map((v) => `"${v}"`).join('|')}
>

export default $`}
    />
  );
};

export const ViewportFields: FC = () => {
  const { APIDocs } = getMDXComponents() as unknown as { APIDocs: FC<{ code?: string }> };
  return (
    <APIDocs
      code={`
import type { ReactFlowInstance, ViewportHelperFunctions } from '@xyflow/react'

type $ = 
  ViewportHelperFunctions &
  Pick<
    ReactFlowInstance,
    ${VIEWPORT_FIELDS.map((v) => `"${v}"`).join('|')}
  >

export default $`}
    />
  );
};
