interface PaginationProps {
  page: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  total,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div
      role="navigation"
      aria-label="Pagination"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
      }}
    >
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-disabled={page === 1}
      >
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
