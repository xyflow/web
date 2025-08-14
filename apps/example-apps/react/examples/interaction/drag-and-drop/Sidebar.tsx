import { useDnD } from './useDnD';

export default () => {
  const { onDragStart } = useDnD();
  
  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane to create new nodes.
      </div>
      <div
        className="dndnode input"
        onPointerDown={(event) => onDragStart(event, 'input')}
      >
        Input Node
      </div>
      <div className="dndnode" onPointerDown={(event) => onDragStart(event, 'default')}>
        Default Node
      </div>
      <div
        className="dndnode output"
        onPointerDown={(event) => onDragStart(event, 'output')}
      >
        Output Node
      </div>
    </aside>
  );
};
