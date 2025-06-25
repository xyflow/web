import { memo } from "react";
import { Position } from "@xyflow/react";
import { LabeledHandle } from "@/registry/components/labeled-handle";
import {
  DatabaseSchemaNode,
  DatabaseSchemaNodeHeader,
  DatabaseSchemaNodeBody,
  DatabaseSchemaTableRow,
  DatabaseSchemaTableCell,
} from "@/registry/components/database-schema-node";

export type DatabaseSchemaNodeData = {
  selected?: boolean;
  data: {
    label: string;
    schema: { title: string; type: string }[];
  };
};

const DatabaseSchemaDemo = memo(
  ({ data, selected }: DatabaseSchemaNodeData) => {
    return (
      <DatabaseSchemaNode className="p-0">
        <DatabaseSchemaNodeHeader>{data.label}</DatabaseSchemaNodeHeader>
        <DatabaseSchemaNodeBody>
          {data.schema.map((entry) => (
            <DatabaseSchemaTableRow key={entry.title}>
              <DatabaseSchemaTableCell className="pl-0 pr-6 font-light">
                <LabeledHandle
                  id={entry.title}
                  title={entry.title}
                  type="target"
                  position={Position.Left}
                />
              </DatabaseSchemaTableCell>
              <DatabaseSchemaTableCell className="pr-0 font-thin">
                <LabeledHandle
                  id={entry.title}
                  title={entry.type}
                  type="source"
                  position={Position.Right}
                  className="p-0"
                  handleClassName="p-0"
                  labelClassName="p-0 w-full pr-3 text-right"
                />
              </DatabaseSchemaTableCell>
            </DatabaseSchemaTableRow>
          ))}
        </DatabaseSchemaNodeBody>
      </DatabaseSchemaNode>
    );
  },
);

export default DatabaseSchemaDemo;
