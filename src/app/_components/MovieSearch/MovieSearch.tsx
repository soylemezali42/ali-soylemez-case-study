"use client";

import { INITIAL_SEARCH_TERM } from "@/app/_utils/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import IconButton from "../IconButton";
import useQueryString from "@/app/_hooks/useQueryString";

/**
 * This component could have been more user friendly using the useDebounce function.
 * However, due to the limit in the movie API it was left like this.
 */
export default function MovieSearch() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [searchTerm, setSearchTerm] = useState(
    title !== null ? title : INITIAL_SEARCH_TERM
  );
  const [releaseYear, setReleaseYear] = useState(searchParams.get("year") || 0);
  const [type, setType] = useState<string | undefined>(
    searchParams.get("type") || undefined
  );

  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useQueryString();

  const handleRouting = () => {
    let queryString = createQueryString("title", searchTerm);
    if (releaseYear !== 0) {
      queryString = createQueryString("year", releaseYear);
    }

    if (type) {
      queryString = createQueryString("type", type);
    }

    router.push(pathname + "?" + queryString);
  };

  return (
    <form>
      <input
        type="text"
        name="title"
        placeholder="A movie title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="number"
        name="year"
        placeholder="Release Year"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        min={1950}
        max={2030}
      />

      <select
        name="type"
        onChange={(e) => setType(e.target.value)}
        value={type}
      >
        <option style={{ display: "none" }}>Select One</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>

      <IconButton
        text="Search"
        buttonProps={{
          type: "submit",
          onClick: handleRouting,
        }}
        src="/search.svg"
        alt="Search Button"
      />
    </form>
  );
}
