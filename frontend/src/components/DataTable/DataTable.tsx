import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useDataFetch } from "../../hooks/useDataFetch";
import { useTableSorting } from "../../hooks/useTableSorting";
import TableHeader from "./TableHeader";

const PAGE_SIZE = 20;

export default function DataTable() {
  const parentRef = useRef<HTMLDivElement>(null);

  const { sortBy, sortOrder, toggleSort } = useTableSorting("id");

  const { data, isLoading, isError } = useDataFetch({
    page: 1,
    limit: PAGE_SIZE,
    sortBy,
    sortOrder,
    search: "",
  });

  const rowVirtualizer = useVirtualizer({
    count: data?.data.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });

  if (isLoading) return <p>Loading table...</p>;
  if (isError) return <p>Failed to load table data</p>;
  if (!data || data.data.length === 0) return <p>No data available</p>;

  return (
    <div role="table" aria-label="User Data Table">
      <TableHeader
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={toggleSort}
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
            const user = data.data[virtualRow.index];

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
                <div role="cell" style={{ width: "80px" }}>
                  {user.id}
                </div>
                <div role="cell" style={{ flex: 1 }}>
                  {user.name}
                </div>
                <div role="cell" style={{ flex: 1 }}>
                  {user.email}
                </div>
                <div role="cell" style={{ flex: 1 }}>
                  {user.company}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
