import { useRef, useState, useMemo, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useDataFetch } from "../../hooks/useDataFetch";
import { useTableSorting } from "../../hooks/useTableSorting";
import { useDebounce } from "../../hooks/useDebounce";
import TableHeader from "./TableHeader";
import Pagination from "./Pagination";
import SearchInput from "../ui/SearchInput";

const PAGE_SIZE = 20;

export default function DataTable() {
  const parentRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);
  const { sortBy, sortOrder, toggleSort } = useTableSorting("id");

  const { data, isLoading, isError } = useDataFetch();

  const processedData = useMemo(() => {
    if (!data) return [];

    let rows = [...data];

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      rows = rows.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.company.toLowerCase().includes(q)
      );
    }

    rows.sort((a, b) => {
      if (sortBy === "id") {
        return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
      }
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      return 0;
    });

    return rows;
  }, [data, debouncedSearch, sortBy, sortOrder]);

  const rowVirtualizer = useVirtualizer({
    count: processedData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });

  // ?? Pagination works by scrolling
  useEffect(() => {
    if (!parentRef.current) return;
    parentRef.current.scrollTo({
      top: (page - 1) * PAGE_SIZE * 48,
      behavior: "auto",
    });
  }, [page]);

  if (isLoading) return <p>Loading table...</p>;
  if (isError) return <p>Error loading data</p>;
  if (!processedData.length) return <p>No data available</p>;

  return (
    <div role="table" aria-label="User Data Table">
      <SearchInput value={search} onChange={setSearch} />

      <TableHeader
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={(col) => {
          setPage(1);
          toggleSort(col);
        }}
      />

      <div
        ref={parentRef}
        role="rowgroup"
        style={{
          height: "400px",
          overflow: "auto",
          border: "1px solid #ddd",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const user = processedData[virtualRow.index];

            return (
              <div
                key={user.id}
                role="row"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 12px",
                  borderBottom: "1px solid #eee",
                  background: "#fff",
                }}
              >
                <div role="cell" style={{ width: "80px" }}>{user.id}</div>
                <div role="cell" style={{ flex: 1 }}>{user.name}</div>
                <div role="cell" style={{ flex: 1 }}>{user.email}</div>
                <div role="cell" style={{ flex: 1 }}>{user.company}</div>
              </div>
            );
          })}
        </div>
      </div>

      <Pagination
        page={page}
        pageSize={PAGE_SIZE}
        total={processedData.length}
        onPageChange={setPage}
      />
    </div>
  );
}
