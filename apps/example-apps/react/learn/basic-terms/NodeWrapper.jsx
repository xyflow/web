const NodeWrapper = ({ children, bottom, top, left, right, width, height }) => {
  const toPx = (value) => (value !== undefined ? `${value}px` : undefined);

  return (
    <div
      className="react-flow__node-annotation"
      style={{
        position: 'absolute',
        fontSize: '12px',
        bottom: toPx(bottom),
        left: toPx(left),
        width: toPx(width),
        height: toPx(height),
        top: toPx(top),
        right: toPx(right),
      }}
    >
      {children}
    </div>
  );
};

export default NodeWrapper;
