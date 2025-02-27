import getMovieList from "@/app/_queries/getMovieList";
import { SearchParams } from "@/app/_types/pageParams";
import { INITIAL_SEARCH_TERM } from "@/app/_utils/constants";
import { DataGridBody } from "../DataGrid";
import { movieColumns } from "./MovieGridContainer";
import ErrorDisplay from "../ErrorDisplay";

type Props = {
  searchParams: SearchParams;
};

/**
 * If this component were to be done by retrieving data from the client,
 * there would be no need to create this component.
 * We created this component so that we could use the server components.
 */

export default async function MovieList({ searchParams }: Props) {
  const searchTerm =
    searchParams?.title !== null ? searchParams?.title : INITIAL_SEARCH_TERM;
  const page = searchParams?.page || "1";
  const year = searchParams?.year;
  const type = searchParams?.type;

  const movieList = await getMovieList({ searchTerm, page, year, type });

  if (movieList.Error && movieList.Search) {
    return <ErrorDisplay cause={movieList.Error} />;
  }

  const normalizedData = (movieList.Search || []).map((item) => ({
    ...item,
    id: item.imdbID,
  }));

  return (
    <DataGridBody columns={movieColumns} data={normalizedData} href="/movie" />
  );
}
