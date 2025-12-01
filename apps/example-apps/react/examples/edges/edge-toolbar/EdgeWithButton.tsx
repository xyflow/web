import {
  EdgeToolbar,
  getBezierPath,
  BaseEdge,
  EdgeProps,
  useReactFlow,
} from '@xyflow/react';

// Example of a custom edge with a centered button in the toolbar component
export function EdgeWithButton(props: EdgeProps) {
  const [edgePath, centerX, centerY] = getBezierPath(props);
  const { deleteElements, getEdges } = useReactFlow();
  const deleteEdge = () => {
    const edge = getEdges().find((e) => e.id === props.id);
    if (edge) deleteElements({ edges: [edge] });
  };

  return (
    <>
      <BaseEdge id={props.id} path={edgePath} />
      <EdgeToolbar edgeId={props.id} x={centerX} y={centerY} isVisible>
        <button className="xy-theme__button" onClick={deleteEdge}>
          Centered Button
        </button>
      </EdgeToolbar>
    </>
  );
}
