import React, { ReactNode } from "react";
import { BaseNode } from "@/registry/components/base-node";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";

/* DATABASE SCHEMA NODE HEADER ------------------------------------------------ */
/**
 * A container for the database schema node header.
 */
interface DatabaseSchemaNodeHeaderProps {
  children?: ReactNode;
}

export function DatabaseSchemaNodeHeader({
  children,
}: DatabaseSchemaNodeHeaderProps) {
  return (
    <h2 className="rounded-tl-md rounded-tr-md bg-secondary p-2 text-center text-sm text-muted-foreground">
      {children}
    </h2>
  );
}

/* DATABASE SCHEMA NODE BODY -------------------------------------------------- */
/**
 * A container for the database schema node body that wraps the table.
 */
interface DatabaseSchemaNodeBodyProps {
  children?: ReactNode;
}

export function DatabaseSchemaNodeBody({
  children,
}: DatabaseSchemaNodeBodyProps) {
  return (
    <table className="border-spacing-10 overflow-visible">
      <TableBody>{children}</TableBody>
    </table>
  );
}

/* DATABASE SCHEMA TABLE ROW -------------------------------------------------- */
/**
 * A wrapper for individual table rows in the database schema node.
 */

interface DatabaseSchemaTableRowProps {
  children: ReactNode;
  className?: string;
}

export function DatabaseSchemaTableRow({
  children,
  className,
}: DatabaseSchemaTableRowProps) {
  return (
    <TableRow className={`relative text-xs ${className || ""}`}>
      {children}
    </TableRow>
  );
}

/* DATABASE SCHEMA TABLE CELL ------------------------------------------------- */
/**
 * A simplified table cell for the database schema node.
 * Renders static content without additional dynamic props.
 */
interface DatabaseSchemaTableCellProps {
  className?: string;
  children?: ReactNode;
}

export function DatabaseSchemaTableCell({
  className,
  children,
}: DatabaseSchemaTableCellProps) {
  return <TableCell className={className}>{children}</TableCell>;
}

/* DATABASE SCHEMA NODE ------------------------------------------------------- */
/**
 * The main DatabaseSchemaNode component that wraps the header and body.
 * It maps over the provided schema data to render rows and cells.
 */
interface DatabaseSchemaNodeProps {
  className?: string;
  selected?: boolean;
  children?: ReactNode;
}

export function DatabaseSchemaNode({
  className,
  selected,
  children,
}: DatabaseSchemaNodeProps) {
  return (
    <BaseNode className={className} selected={selected}>
      {children}
    </BaseNode>
  );
}
