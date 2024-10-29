import { memo } from 'react';

function AnnotationNode({ data }) {
  return (
    <>
      <div className='annotation-content'>
        <div className='annotation-level'>{data.level}.</div>
        <div>{data.label}</div>
      </div>
      {data.arrowStyle && (
        <div className="annotation-arrow" style={data.arrowStyle}>
          ⤹
        </div>
      )}
    </>
  );
}

export default memo(AnnotationNode);
