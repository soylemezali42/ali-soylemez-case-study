import { Movie } from "../_components/MovieGridContainer";

type MovieDetailResponse = Movie & {
  [index: string]: string | undefined;
  Response: "True" | "False";
  Error?: string;
};

type MovieDetailProps = {
  id: string | string[];
};

export default async function getMovieDetail({
  id,
}: MovieDetailProps): Promise<MovieDetailResponse> {
  /**
   * Since we will be querying from both the client and the server side,
   * we find the API key.
   */

  const apiKey = process.env.OMDB_API_KEY;

  /**
   * We are sure, this parameters will be provided
   * by the application.
   */
  const params = new URLSearchParams();
  params.set("apiKey", apiKey as string);
  params.set("i", id as string);

  const data = await fetch(`http://www.omdbapi.com/?${params.toString()}
`);

  const movieDetail = await data.json();
  return movieDetail;
}
