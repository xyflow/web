import { createContext, useContext, useState } from 'react';

const DnDContext = createContext([null, (_) => {}, false, (_) => {}], {x: 0, y: 0}, (_) => {});

export const DnDProvider = ({ children }) => {
  const [type, setType] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  return (
    <DnDContext.Provider value={[type, setType, isDragging, setIsDragging, dragPosition, setDragPosition]}>
      {children}
    </DnDContext.Provider>
  );
}

export default DnDContext;

export const useDnD = () => {
  return useContext(DnDContext);
}