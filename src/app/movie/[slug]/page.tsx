import ErrorDisplay from "@/app/_components/ErrorDisplay";
import getMovieDetail from "@/app/_queries/getMovieDetail";
import Image from "next/image";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: Props) {
  const slug = (await props.params).slug;

  const movieDetail = await getMovieDetail({ id: slug });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { Title, Error, Poster, Ratings, Response, ...rest } = movieDetail;

  if (Error) {
    return <ErrorDisplay cause={movieDetail.Error as string} />;
  }

  return (
    <div className="col-container">
      <h1>{Title}</h1>
      <div className="row-container">
        <Image src={Poster} alt={Title} width={350} height={500} />
        <li>
          {Object.keys(rest).map((k) => (
            <ul key={k}>
              <span className="list-label">{k}</span>
              <span>: {rest[k]}</span>
            </ul>
          ))}
        </li>
      </div>
    </div>
  );
}
