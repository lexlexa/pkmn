import { useState } from "react";

export const useSearch = <T>(
  items: T[],
  filterFn: (item: T, search: string) => boolean
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void, T[]] => {
  const [search, setSearch] = useState("");

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const filteredValues = items.filter((item) =>
    filterFn(item, search.toLowerCase())
  );

  return [search, handleChangeSearch, filteredValues];
};
