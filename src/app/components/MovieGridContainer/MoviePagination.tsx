"use client";

import getMovieList from "@/app/queries/getMovieList";
import { INITIAL_SEARCH_TERM } from "@/app/utils/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";

export default function MoviePagination() {
  const searchParams = useSearchParams();
  const firstSearchTitle = searchParams.get("title");
  const searchTerm = firstSearchTitle || INITIAL_SEARCH_TERM;

  const pathname = usePathname();
  const router = useRouter();

  const [listCount, setListCount] = useState(0);

  useEffect(() => {
    async function getMovieListCount() {
      const res = await getMovieList({ searchTerm, fromClient: true });
      setListCount(res.totalResults || 0);
    }

    getMovieListCount();
  }, [searchTerm]);

  /**
   * In this section, we ensure that the search text in the initial
   * search bar and the URL are synchronized.
   */
  useEffect(() => {
    if (firstSearchTitle === null) {
      router.push(pathname + `?title=${INITIAL_SEARCH_TERM}&page=1`);
    }
  }, [router, pathname, firstSearchTitle]);

  return <Pagination listCount={listCount} />;
}
