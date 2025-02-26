"use client";

import { INITIAL_SEARCH_TERM } from "@/app/utils/constants";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

/**
 * This component could have been more user friendly using the useDebounce function.
 * However, due to the limit in the movie API it was left like this.
 */
export default function MovieSearch() {
  const searchParams = useSearchParams();
  const titleSearch = searchParams.get("title");
  const [searchTerm, setSearchTerm] = useState(
    titleSearch || INITIAL_SEARCH_TERM
  );

  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRouting = () => {
    router.push(pathname + "?title=" + searchTerm);
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
      <button type="submit" onClick={handleRouting}>
        <Image src="/search.svg" alt="Search button" width={24} height={24} />
      </button>
    </form>
  );
}
