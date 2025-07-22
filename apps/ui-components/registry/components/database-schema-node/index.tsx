import React, { type ReactNode } from "react";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
} from "@/registry/components/base-node";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";

/* DATABASE SCHEMA NODE HEADER ------------------------------------------------ */
/**
 * A container for the database schema node header.
 */
export type DatabaseSchemaNodeHeaderProps = {
  children?: ReactNode;
};

export const DatabaseSchemaNodeHeader = ({
  children,
}: DatabaseSchemaNodeHeaderProps) => {
  return (
    <BaseNodeHeader className="rounded-tl-md rounded-tr-md bg-secondary p-2 text-center text-sm text-muted-foreground">
      <h2>{children}</h2>
    </BaseNodeHeader>
  );
};

/* DATABASE SCHEMA NODE BODY -------------------------------------------------- */
/**
 * A container for the database schema node body that wraps the table.
 */
export type DatabaseSchemaNodeBodyProps = {
  children?: ReactNode;
};

export const DatabaseSchemaNodeBody = ({
  children,
}: DatabaseSchemaNodeBodyProps) => {
  return (
    <BaseNodeContent className="p-0">
      <table className="border-spacing-10 overflow-visible">
        <TableBody>{children}</TableBody>
      </table>
    </BaseNodeContent>
  );
};

/* DATABASE SCHEMA TABLE ROW -------------------------------------------------- */
/**
 * A wrapper for individual table rows in the database schema node.
 */

export type DatabaseSchemaTableRowProps = {
  children: ReactNode;
  className?: string;
};

export const DatabaseSchemaTableRow = ({
  children,
  className,
}: DatabaseSchemaTableRowProps) => {
  return (
    <TableRow className={`relative text-xs ${className || ""}`}>
      {children}
    </TableRow>
  );
};

/* DATABASE SCHEMA TABLE CELL ------------------------------------------------- */
/**
 * A simplified table cell for the database schema node.
 * Renders static content without additional dynamic props.
 */
export type DatabaseSchemaTableCellProps = {
  className?: string;
  children?: ReactNode;
};

export const DatabaseSchemaTableCell = ({
  className,
  children,
}: DatabaseSchemaTableCellProps) => {
  return <TableCell className={className}>{children}</TableCell>;
};

/* DATABASE SCHEMA NODE ------------------------------------------------------- */
/**
 * The main DatabaseSchemaNode component that wraps the header and body.
 * It maps over the provided schema data to render rows and cells.
 */
export type DatabaseSchemaNodeProps = {
  className?: string;
  children?: ReactNode;
};

export const DatabaseSchemaNode = ({
  className,
  children,
}: DatabaseSchemaNodeProps) => {
  return <BaseNode className={className}>{children}</BaseNode>;
};
