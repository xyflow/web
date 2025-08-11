import { useDnD } from './useDnD';

export default () => {
  const { startDragging } = useDnD();

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
      <div
        className="dndnode input"
        onPointerDown={(event) => startDragging(event, 'input')}
      >
        Input Node
      </div>
      <div className="dndnode" onPointerDown={(event) => startDragging(event, 'default')}>
        Default Node
      </div>
      <div
        className="dndnode output"
        onPointerDown={(event) => startDragging(event, 'output')}
      >
        Output Node
      </div>
    </aside>
  );
};
