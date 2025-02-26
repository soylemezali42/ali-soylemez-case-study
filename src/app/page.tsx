import MovieGridContainer from "./components/MovieGridContainer";
import MovieSearch from "./components/MovieSearch";
import { SearchParams } from "./types/pageParams";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;

  return (
    <div>
      <main>
        <MovieSearch />
        <MovieGridContainer searchParams={searchParams} />
      </main>
    </div>
  );
}
