import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useDataFetch } from "../../hooks/useDataFetch";
import { useTableSorting } from "../../hooks/useTableSorting";

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
    <div>
      <h2>User Table</h2>

      <div
        ref={parentRef}
        style={{
          height: "400px",
          overflow: "auto",
          border: "1px solid #ddd",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const user = data.data[virtualRow.index];

            return (
              <div
                key={user.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: "flex",
                  padding: "0 12px",
                  alignItems: "center",
                  borderBottom: "1px solid #eee",
                  background: "#fff",
                }}
              >
                <div style={{ width: "80px" }}>{user.id}</div>
                <div style={{ flex: 1 }}>{user.name}</div>
                <div style={{ flex: 1 }}>{user.email}</div>
                <div style={{ flex: 1 }}>{user.company}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
