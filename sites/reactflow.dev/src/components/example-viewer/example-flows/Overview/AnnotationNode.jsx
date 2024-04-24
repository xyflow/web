import { memo } from 'react';

function AnnotationNode({ data }) {
  return (
    <>
      <div style={{ padding: 10 }}>{data.label}</div>
      {data.arrowStyle && (
        <div className="arrow" style={data.arrowStyle}>
          ⤹
        </div>
      )}
    </>
  );
}

export default memo(AnnotationNode);
