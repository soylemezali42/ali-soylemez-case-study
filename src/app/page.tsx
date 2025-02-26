import MovieGrid from "./components/MovieGrid";
import MovieSearch from "./components/MovieSearch";
import getMovieList from "./queries/getMovieList";
import { SearchParams } from "./types/pageParams";
import { INITIAL_SEARCH_TERM } from "./utils/constants";

type PageProps = {
  searchParams: SearchParams;
};

export default async function Home(props: PageProps) {
  // The await part gives a warning, but the documentation says the opposite.
  const searchParams = await props.searchParams;
  /**
   * Launch with the initial search term by default.
   */
  const searchTerm = searchParams?.title || INITIAL_SEARCH_TERM;
  const movieList = await getMovieList({ searchTerm });

  if (movieList.Error) {
    return <div>Error Occured</div>;
  }

  if (movieList.Search) {
    return (
      <div>
        <main>
          <MovieSearch />
          <MovieGrid data={movieList.Search} />
        </main>
      </div>
    );
  }
}
