"use client";

import { INITIAL_SEARCH_TERM } from "@/app/utils/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, ChangeEvent } from "react";
import IconButton from "../IconButton";
import useQueryString from "@/app/hooks/useQueryString";

/**
 * This component could have been more user friendly using the useDebounce function.
 * However, due to the limit in the movie API it was left like this.
 */
export default function MovieSearch() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [searchTerm, setSearchTerm] = useState(title || INITIAL_SEARCH_TERM);

  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useQueryString();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRouting = () => {
    router.push(pathname + "?" + createQueryString("title", searchTerm));
  };

  return (
    <form>
      <input
        type="text"
        name="title"
        placeholder="A movie title"
        value={searchTerm}
        onChange={handleSearch}
      />
      <IconButton
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
