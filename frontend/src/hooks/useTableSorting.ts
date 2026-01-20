import { useState } from "react";

export type SortOrder = "asc" | "desc";

export function useTableSorting(initialColumn: string) {
  const [sortBy, setSortBy] = useState(initialColumn);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const toggleSort = (column: string) => {
    if (column === sortBy) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return {
    sortBy,
    sortOrder,
    toggleSort,
  };
}
