async function getMovieList({ searchTerm }: { searchTerm: string }) {
  const data =
    await fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${searchTerm}
`);

  const movieList = await data.json();
  return movieList;
}

export default async function Home() {
  const movieList = await getMovieList({ searchTerm: "pokemon" });
  console.log("Movie List:", movieList);
  return (
    <div>
      <main>Movie List</main>
    </div>
  );
}
