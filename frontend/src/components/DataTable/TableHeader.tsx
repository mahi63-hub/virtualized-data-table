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
  const getAriaSort = (column: string) => {
    if (sortBy !== column) return "none";
    return sortOrder === "asc" ? "ascending" : "descending";
  };

  const renderIcon = (column: string) => {
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
        aria-sort={getAriaSort("id")}
        tabIndex={0}
        onClick={() => onSort("id")}
        style={{ width: "80px" }}
      >
        ID {renderIcon("id")}
      </button>

      <button
        role="columnheader"
        aria-sort={getAriaSort("name")}
        tabIndex={0}
        onClick={() => onSort("name")}
        style={{ flex: 1 }}
      >
        Name {renderIcon("name")}
      </button>

      <div role="columnheader" style={{ flex: 1 }}>
        Email
      </div>

      <div role="columnheader" style={{ flex: 1 }}>
        Company
      </div>
    </div>
  );
}
