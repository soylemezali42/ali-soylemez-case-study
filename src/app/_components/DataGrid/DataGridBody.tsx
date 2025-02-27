"use client";
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
           * Burada rowların key'i olarak id bekliyoruz.
           * Ancak bu tamamen verinin şekline bağlı olarak
           * tekrar düşünülebilir. Bu bileşeni generic yaptığımızdan
           * dolayı bu şekilde bir yöntem uyguladık.
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
        <div>No Data</div>
      )}
    </>
  );
}
