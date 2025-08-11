import { createContext, useContext, useState } from 'react';

interface DnDContextType {
  type: string | null;
  setType: (type: string | null) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  dragPosition: { x: number; y: number };
  setDragPosition: (dragPosition: { x: number; y: number }) => void;
}

const DnDContext = createContext<DnDContextType>({
  type: null,
  setType: () => {},
  isDragging: false,
  setIsDragging: () => {},
  dragPosition: { x: 0, y: 0 },
  setDragPosition: () => {},
});

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  return (
    <DnDContext.Provider
      value={{ type, setType, isDragging, setIsDragging, dragPosition, setDragPosition }}
    >
      {children}
    </DnDContext.Provider>
  );
};

export default DnDContext;

export const useDnD = () => {
  return useContext(DnDContext);
};
