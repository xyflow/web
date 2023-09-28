import React, { memo } from 'react';
import { Position } from 'reactflow';
import CustomHandle from './CustomHandle';

const CustomNode = () => {
    return (
        <div style={{ background: 'white', padding: 16, border: '1px solid black' }}>
            <CustomHandle type="target" position={Position.Left} isConnectable={1} />
            <div>Connection Limit 1</div>
        </div>
    );
};

export default memo(CustomNode);
