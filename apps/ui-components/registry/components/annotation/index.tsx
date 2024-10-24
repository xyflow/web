import { Node, NodeProps } from "@xyflow/react";

type arrowStyleProps = {
  right?: number;   
  bottom?: number;  
  transform?: string; 
};

type Annotation = Node<{
  label: string;
  level: number;
  arrow: string;
  arrowStyle: arrowStyleProps;
}>;

export function Annotation({ data }: NodeProps<Annotation>) {
  return (
    <div className="relative p-2 w-40">
      <div className="flex items-start"> 
        <div className="mr-1 leading-snug">{data.level}.</div> 
        <div className="leading-snug">{data.label}</div> 
      </div>

      {data.arrowStyle && (
        <div
          className="absolute text-2xl"
          style={{
            right: data.arrowStyle.right,   
            bottom: data.arrowStyle.bottom,  
            transform: data.arrowStyle.transform,
          }}
        >
        {data.arrow}
        </div>
      )}
    </div>
  );
}
