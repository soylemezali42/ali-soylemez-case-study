import getMovieList from "@/app/queries/getMovieList";
import { SearchParams } from "@/app/types/pageParams";
import { INITIAL_SEARCH_TERM } from "@/app/utils/constants";
import { DataGridBody } from "../DataGrid";
import { movieColumns } from "./MovieGridContainer";

type Props = {
  searchParams: SearchParams;
};

export default async function MovieList({ searchParams }: Props) {
  const searchTerm = searchParams?.title || INITIAL_SEARCH_TERM;
  const page = searchParams?.page || "1";

  const movieList = await getMovieList({ searchTerm, page });

  if (movieList.Error && movieList.Search) {
    return <div>Error Occured</div>;
  }

  const normalizedData = (movieList.Search || []).map((item) => ({
    ...item,
    id: item.imdbID,
  }));

  return <DataGridBody columns={movieColumns} data={normalizedData} />;
}
