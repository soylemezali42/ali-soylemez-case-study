import { Movie } from "../components/MovieGrid";

type MovieResponse = {
  Search?: Movie[];
  totalResults?: number;
  Response: boolean;
  Error?: string;
};

export default async function getMovieList({
  searchTerm,
}: {
  searchTerm: string;
}): Promise<MovieResponse> {
  const data =
    await fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${searchTerm}
`);

  const movieList = await data.json();
  return movieList;
}
