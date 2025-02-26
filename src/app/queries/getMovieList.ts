import { Movie } from "../components/MovieGridContainer";

type MovieResponse = {
  Search?: Movie[];
  totalResults?: number;
  Response: boolean;
  Error?: string;
};

type MovieListProps = {
  searchTerm: string | string[];
  page?: string | string[];
  fromClient?: boolean;
};

export default async function getMovieList({
  searchTerm,
  page = "1",
  fromClient = false,
}: MovieListProps): Promise<MovieResponse> {
  /**
   * Since we will be querying from both the client and the server side,
   * we find the API key.
   */

  const apiKey = fromClient
    ? process.env.NEXT_PUBLIC_OMDB_API_KEY
    : process.env.OMDB_API_KEY;

  const data =
    await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&page=${page}
`);

  const movieList = await data.json();
  return movieList;
}
