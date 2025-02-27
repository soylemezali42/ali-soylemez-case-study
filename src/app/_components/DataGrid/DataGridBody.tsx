import Link from "next/link";
import { DataGridColumns, RowData } from "./DataGrid";

type Props<T> = {
  columns: DataGridColumns<T>[];
  data: RowData<T>[];
  href: string; // is used for row navigation
};

export default function DataGridBody<T>({ columns, data, href }: Props<T>) {
  return (
    <>
      {data.length ? (
        data.map((row) => {
          /**
           * Here we expect id as the key of the rows.
           * However, this can be reconsidered depending on the form of the data.
           *  Since we made this component generic,
           * we implemented such a method.
           */
          return (
            <Link href={`${href}/${row.id}`} legacyBehavior key={row.id}>
              <tr key={row.id}>
                {columns.map(({ columnKey }, index) => {
                  const cellRecord = row[columnKey] as React.ReactNode;
                  return <td key={`${row.id}-${index}`}>{cellRecord}</td>;
                })}
              </tr>
            </Link>
          );
        })
      ) : (
        <tr>
          <td>No Data</td>
        </tr>
      )}
    </>
  );
}
