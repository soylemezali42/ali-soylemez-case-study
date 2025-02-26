import MovieGrid from "./components/MovieGrid";
import getMovieList from "./queries/getMovieList";

export default async function Home() {
  const movieList = await getMovieList({ searchTerm: "pokemon" });

  if (movieList.Error) {
    return <div>Error Occured</div>;
  }

  if (movieList.Search) {
    return (
      <div>
        <main>{<MovieGrid data={movieList.Search} />}</main>
      </div>
    );
  }
}
