import { Movie } from "../components/MovieGridContainer";

type MovieResponse = {
  Search?: Movie[];
  totalResults?: number;
  Response: boolean;
  Error?: string;
};

type MovieListProps = {
  searchTerm: string | string[] | undefined;
  page?: string | string[];
  year?: string | string[] | null;
  type?: string | string[];
  fromClient?: boolean;
};

export default async function getMovieList({
  searchTerm,
  page = "1",
  year,
  type,
  fromClient = false,
}: MovieListProps): Promise<MovieResponse> {
  /**
   * Since we will be querying from both the client and the server side,
   * we find the API key.
   */

  const apiKey = fromClient
    ? process.env.NEXT_PUBLIC_OMDB_API_KEY
    : process.env.OMDB_API_KEY;

  /**
   * We are sure, this parameters will be provided
   * by the application.
   */
  const params = new URLSearchParams();
  params.set("apiKey", apiKey as string);
  if (searchTerm) {
    params.set("s", searchTerm as string);
  }

  params.set("page", page as string);
  if (year) {
    params.set("y", year as string);
  }

  if (type) {
    params.set("type", type as string);
  }

  const data = await fetch(`http://www.omdbapi.com/?${params.toString()}
`);

  const movieList = await data.json();
  return movieList;
}
