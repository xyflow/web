import {
  EdgeToolbar,
  getBezierPath,
  BaseEdge,
  EdgeProps,
  useReactFlow,
} from '@xyflow/react';

// Simple example of an edge with a floating toolbar based on the connected nodes' positions
export function EdgeWithToolbar(props: EdgeProps) {
  const [edgePath, centerX] = getBezierPath(props);
  const { deleteElements } = useReactFlow();
  const y = Math.min(props.sourceY, props.targetY);

  return (
    <>
      <BaseEdge id={props.id} path={edgePath} />
      <EdgeToolbar edgeId={props.id} x={centerX} y={y} isVisible>
        <div
          style={{
            background: 'white',
            padding: '5px 10px',
            borderRadius: 5,
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }}
        >
          Floating Toolbar
        </div>
      </EdgeToolbar>
    </>
  );
}
