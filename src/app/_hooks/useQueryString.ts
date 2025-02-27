import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useQueryString() {
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string | number | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, String(value));

      return params.toString();
    },
    [searchParams]
  );

  return createQueryString;
}
