import { ReactNode } from "react";
import DataGridHeader from "./DataGridHeader";

export type DataGridColumns<T> = {
  label: string;
  columnKey: keyof T;
};

export type RowData<T> = {
  id: string;
} & {
  [K in keyof T]: T[K];
};

export type DataGridTableProps<T> = {
  columns: DataGridColumns<T>[];
  children: ReactNode;
};

export default function DataGrid<T>({
  columns,
  children,
}: DataGridTableProps<T>) {
  return (
    <table>
      <DataGridHeader columns={columns} />
      <tbody>{children}</tbody>
    </table>
  );
}
