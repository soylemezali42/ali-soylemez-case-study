import Grid, { GridColumns } from "../Grid";

export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

const movieColumns: GridColumns<Movie>[] = [
  {
    label: "Name",
    columnKey: "Title",
  },
  {
    label: "Release Date",
    columnKey: "Year",
  },
  {
    label: "IMDB ID",
    columnKey: "imdbID",
  },
];

type MovieGridProps = {
  data: Movie[];
};

export default function MovieGrid({ data }: MovieGridProps) {
  /**
   * UYARI
   * Grid data kısmında table rowlar id bekledikleri için
   * burada bir id'leri ekliyoruz. Ancak, bu işlem server tarafında
   * yapılması veya Grid bileşeni üzerinde id yerine başka bir alan
   * kullanılarak çözülebilir.
   */
  const normalizedData = data.map((item) => ({ ...item, id: item.imdbID }));

  return <Grid columns={movieColumns} data={normalizedData} />;
}
