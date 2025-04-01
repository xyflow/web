import { useMDXComponents } from '@/mdx-components';

const INTERSECTION_FIELDS = ['getIntersectingNodes', 'isNodeIntersecting']

const VIEWPORT_FIELDS = ['viewportInitialized', 'fitView'];

// @ts-expect-error -- false positive
const { APIDocs } = useMDXComponents()

export const nodesAndEdgesFields = <APIDocs code={`
import type { ReactFlowInstance, ViewportHelperFunctions } from '@xyflow/react'
type $ = Omit<ReactFlowInstance, ${INTERSECTION_FIELDS.map(v => `"${v}"`).join('|')}, keyof ViewportHelperFunctions>
export default $
`} />

export const intersectionFields = <APIDocs code={`
import type { ReactFlowInstance } from '@xyflow/react'
type $ = Pick<ReactFlowInstance, ${INTERSECTION_FIELDS.map(v => `"${v}"`).join('|')}>
export default $
`} />

export const viewportFields = <APIDocs code={`
import type { ReactFlowInstance, ViewportHelperFunctions } from '@xyflow/react'
type $ = ViewportHelperFunctions & Pick<ReactFlowInstance, ${VIEWPORT_FIELDS.map(v => `"${v}"`).join('|')}>
export default $
`} />
