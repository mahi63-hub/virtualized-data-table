import { useMemo, useState } from "react";
import "../../index.css";

const PAGE_SIZE = 10;

export default function DataTable({ data = [] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const processed = useMemo(() => {
    let rows = [...data];

    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(
        u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }

    rows.sort((a, b) =>
      sortOrder === "asc"
        ? a[sortKey] > b[sortKey] ? 1 : -1
        : a[sortKey] < b[sortKey] ? 1 : -1
    );

    return rows;
  }, [data, search, sortKey, sortOrder]);

  const pageData = processed.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="table-card">
      <h2>Virtualized Data Table</h2>

      <input
        className="table-search"
        placeholder="Search by name or email"
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
      />

      <table>
        <thead>
          <tr>
            <th onClick={() => { setSortKey("id"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>
              ID
            </th>
            <th onClick={() => { setSortKey("name"); setSortOrder(sortOrder === "asc" ? "desc" : "asc"); }}>
              Name
            </th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {pageData.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {page}</span>
        <button disabled={page * PAGE_SIZE >= processed.length} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
