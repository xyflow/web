import { memo } from 'react';
import {
  Handle,
  Position,
  useHandleConnections,
  useNodesData,
} from '@xyflow/react';
import { isTextNode, type MyNode } from './initialElements';

function ResultNode() {
  const connections = useHandleConnections({
    type: 'target',
  });
  const nodesData = useNodesData<MyNode>(
    connections.map((connection) => connection.source),
  );
  const textNodes = nodesData.filter(isTextNode);

  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div>
        incoming texts:{' '}
        {textNodes.map(({ data }, i) => <div key={i}>{data.text}</div>) ||
          'none'}
      </div>
    </div>
  );
}

export default memo(ResultNode);
