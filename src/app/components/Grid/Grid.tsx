export type GridColumns<T> = {
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
    <div>
      <table>
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
        <tbody>
          {data.map((row) => {
            /**
             * Burada rowların key'i olarak id bekliyoruz.
             * Ancak bu tamamen verinin şekline bağlı olarak
             * tekrar düşünülebilir. Bu bileşeni generic yaptığımızdan
             * dolayı bu şekilde bir yöntem uyguladık.
             */
            return (
              <tr key={row.id}>
                {columns.map(({ columnKey }, index) => {
                  const cellRecord = row[columnKey] as React.ReactNode;
                  return <td key={`${row.id}-${index}`}>{cellRecord}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
