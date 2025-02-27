import getMovieList from "@/app/_queries/getMovieList";
import { SearchParams } from "@/app/_types/pageParams";
import { INITIAL_SEARCH_TERM } from "@/app/_utils/constants";
import { DataGridBody } from "../DataGrid";
import { movieColumns } from "./MovieGridContainer";

type Props = {
  searchParams: SearchParams;
};

export default async function MovieList({ searchParams }: Props) {
  const searchTerm =
    searchParams?.title !== null ? searchParams?.title : INITIAL_SEARCH_TERM;
  const page = searchParams?.page || "1";
  const year = searchParams?.year;
  const type = searchParams?.type;

  const movieList = await getMovieList({ searchTerm, page, year, type });

  if (movieList.Error && movieList.Search) {
    return <div>Error Occured</div>;
  }

  const normalizedData = (movieList.Search || []).map((item) => ({
    ...item,
    id: item.imdbID,
  }));

  return (
    <DataGridBody columns={movieColumns} data={normalizedData} href="/movie" />
  );
}
