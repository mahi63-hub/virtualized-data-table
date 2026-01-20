interface TableHeaderProps {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (column: string) => void;
}

export default function TableHeader({
  sortBy,
  sortOrder,
  onSort,
}: TableHeaderProps) {
  const renderSortIcon = (column: string) => {
    if (sortBy !== column) return "?";
    return sortOrder === "asc" ? "?" : "?";
  };

  return (
    <div
      role="row"
      style={{
        display: "flex",
        padding: "8px 12px",
        fontWeight: 600,
        borderBottom: "2px solid #ccc",
        background: "#f3f4f6",
      }}
    >
      <button
        role="columnheader"
        aria-sort={sortBy === "id" ? sortOrder : "none"}
        onClick={() => onSort("id")}
        style={{ width: "80px", background: "none", border: "none" }}
      >
        ID {renderSortIcon("id")}
      </button>

      <button
        role="columnheader"
        aria-sort={sortBy === "name" ? sortOrder : "none"}
        onClick={() => onSort("name")}
        style={{ flex: 1, background: "none", border: "none" }}
      >
        Name {renderSortIcon("name")}
      </button>

      <div style={{ flex: 1 }}>Email</div>
      <div style={{ flex: 1 }}>Company</div>
    </div>
  );
}
