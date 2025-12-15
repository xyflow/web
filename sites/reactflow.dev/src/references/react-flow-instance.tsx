import type { FC } from 'react';
import { useMDXComponents as getMDXComponents } from 'xy-shared/components/mdx-components';

const INTERSECTION_FIELDS = ['getIntersectingNodes', 'isNodeIntersecting'];
const VIEWPORT_FIELDS = ['viewportInitialized', 'fitView'];

const { APIDocs } = getMDXComponents() as unknown as { APIDocs: FC<{ code?: string }> };

export const NodesAndEdgesFields: FC = () => {
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
