import { memo } from 'react';

function AnnotationNode({ data }) {
  return (
    <>
      <div className="annotation-content">
        <div>{data.label}</div>
      </div>
      {data.arrowStyle && <div className={`annotation-arrow ${data.arrowStyle}`}>⤹</div>}
    </>
  );
}

export { AnnotationNode };
export default memo(AnnotationNode);
