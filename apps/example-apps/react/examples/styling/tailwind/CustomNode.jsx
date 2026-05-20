import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

function CustomNode({ data }) {
  return (
    <div className="rounded-md border-2 border-stone-400 bg-white px-4 py-2 shadow-md dark:border-gray-600 dark:bg-gray-800">
      <div className="flex">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 dark:bg-gray-700">
          {data.emoji}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {data.name}
          </div>
          <div className="text-gray-500 dark:text-gray-400">{data.job}</div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500 dark:!bg-teal-400"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500 dark:!bg-teal-400"
      />
    </div>
  );
}

export default memo(CustomNode);
