"use client";
import { GRID_DISPLAY_COUNT } from "@/app/_utils/constants";
import IconButton from "../IconButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useQueryString from "@/app/_hooks/useQueryString";

type Props = {
  listCount: number;
};

export default function Pagination({ listCount }: Props) {
  const searchParams = useSearchParams();
  const currentPageNumber = +(searchParams.get("page") || 1);
  const totalPageCount = Math.ceil(listCount / GRID_DISPLAY_COUNT);

  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useQueryString();

  const handlePagination = (
    paginationType: "first" | "previous" | "next" | "last"
  ) => {
    let newPageNumber = currentPageNumber;
    switch (paginationType) {
      case "first":
        newPageNumber = 1;
        break;
      case "previous":
        newPageNumber -= 1;
        break;
      case "next":
        newPageNumber += 1;
        break;
      case "last":
        newPageNumber = totalPageCount;
        break;
    }

    router.push(pathname + "?" + createQueryString("page", newPageNumber));
  };

  return (
    <div>
      <IconButton
        src="/chevron-double-left.svg"
        alt="First page"
        buttonProps={{
          onClick: () => handlePagination("first"),
          disabled: currentPageNumber === 1,
        }}
      />
      <IconButton
        src="/chevron-left.svg"
        alt="Previous Page"
        buttonProps={{
          onClick: () => handlePagination("previous"),
          disabled: currentPageNumber === 1,
        }}
      />
      <IconButton
        src="/chevron-right.svg"
        alt="Next Page"
        buttonProps={{
          onClick: () => handlePagination("next"),
          disabled: currentPageNumber === totalPageCount,
        }}
      />
      <IconButton
        src="/chevron-double-right.svg"
        alt="Last Page"
        buttonProps={{
          onClick: () => handlePagination("last"),
          disabled: currentPageNumber === totalPageCount,
        }}
      />
    </div>
  );
}
