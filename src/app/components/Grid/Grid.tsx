type GridColumns<T> = {
  label: string;
  columnKey: keyof T;
};

type RowData<T> = {
  id: string;
} & {
  [K in keyof T]: T[K];
};

export type GridTableProps<T> = {
  columns: GridColumns<T>[];
  data: RowData<T>[];
};

export default function Grid<T>({ columns, data }: GridTableProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <table className="border-collapse border border-gray-300">
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th
                  key={column.columnKey as string}
                  className="border border-gray-300 p-2 bg-gray-100"
                >
                  <div className="flex flex-row items-center">
                    {column.label}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row.id}>
                {columns.map(({ columnKey }, index) => {
                  const cellRecord = row[columnKey] as React.ReactNode;
                  return (
                    <td
                      key={`${row.id}-${index}`}
                      className="border border-gray-300 p-2"
                    >
                      {cellRecord}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
