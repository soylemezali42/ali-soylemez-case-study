import { DataGridColumns } from "./DataGrid";

type Props<T> = {
  columns: DataGridColumns<T>[];
};

export default function DataGridHeader<T>({ columns }: Props<T>) {
  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return (
            <th key={column.columnKey as string}>
              <div>{column.label}</div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
