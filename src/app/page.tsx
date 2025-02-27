import MovieGridContainer from "./_components/MovieGridContainer";
import MovieSearch from "./_components/MovieSearch";
import { SearchParams } from "./_types/pageParams";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;

  return (
    <div className="col-container">
      <h1>The Movie List</h1>
      <MovieSearch />
      <MovieGridContainer searchParams={searchParams} />
    </div>
  );
}
