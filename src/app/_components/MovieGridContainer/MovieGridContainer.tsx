import { SearchParams } from "@/app/_types/pageParams";
import DataGrid, { DataGridColumns } from "../DataGrid";
import { Suspense } from "react";
import MovieList from "./MovieList";
import MoviePagination from "./MoviePagination";

/**
 * Movie type actually contains more fields,
 * but for now, this much fields will be enough to show.
 */
export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Genre: string;
  Plot: string;
  Country: string;
  Poster: string;
  imdbRating: string;
};

export const movieColumns: DataGridColumns<Movie>[] = [
  {
    label: "Name",
    columnKey: "Title",
  },
  {
    label: "Release Year",
    columnKey: "Year",
  },
  {
    label: "IMDB ID",
    columnKey: "imdbID",
  },
];

type Props = {
  searchParams: SearchParams;
};

export default async function MovieGridContainer({ searchParams }: Props) {
  return (
    <>
      <DataGrid columns={movieColumns}>
        <Suspense
          fallback={
            <tr>
              <td>Loading...</td>
            </tr>
          }
          /**
           * This key is required for suspension to work with searchParams changes.
           */
          key={String(searchParams?.title) + searchParams?.page}
        >
          <MovieList searchParams={searchParams} />
        </Suspense>
      </DataGrid>
      <MoviePagination />
    </>
  );
}
