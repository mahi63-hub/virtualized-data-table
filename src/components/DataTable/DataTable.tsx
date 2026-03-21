import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDataFetch } from '../../hooks/useDataFetch';
import { useDebounce } from '../../hooks/useDebounce';
import SearchInput from '../ui/SearchInput';
import LoadingSpinner from '../ui/LoadingSpinner';
import Pagination from './Pagination';
import TableHeader, { SortConfig } from './TableHeader';
import TableRow from './TableRow';
import { AlertCircle } from 'lucide-react';

const COLUMNS = [
  { key: 'id', label: 'ID', sortable: true, width: '80px' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true, width: '0' },
  { key: 'company', label: 'Company', sortable: true, width: '0' },
  { key: 'role', label: 'Role', sortable: true, width: '120px' },
  { key: 'status', label: 'Status', sortable: true, width: '100px' },
];

const DataTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortConfig]);

  const { data, isLoading, isError, isFetching } = useDataFetch({
    page,
    limit,
    search: debouncedSearch,
    sortBy: sortConfig?.key,
    sortOrder: sortConfig?.order,
  });

  const parentRef = useRef<HTMLDivElement>(null);

  const users = useMemo(() => data?.data || [], [data]);
  const totalCount = data?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const rowVirtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 10,
  });

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        if (prev.order === 'asc') return { key, order: 'desc' };
        return null;
      }
      return { key, order: 'asc' };
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Search and Limit Controls */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white flex-shrink-0">
        <div className="w-full sm:w-72">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search users..."
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm text-gray-600">Rows per page:</label>
          <select
            id="limit"
            className="border-gray-300 rounded-md text-sm py-1.5 pl-3 pr-8 focus:ring-blue-500 focus:border-blue-500"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={500}>500</option>
          </select>
        </div>
      </div>

      {/* Main Table Content Container */}
      <div className="flex-1 relative overflow-x-auto flex flex-col">
        {isError ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-lg font-medium text-gray-900">Failed to load data</p>
            <p className="text-gray-500 mt-1">Please check if the mock API server is running.</p>
          </div>
        ) : (
          <div className="min-w-[800px] flex-1 flex flex-col" role="table" aria-label="User Data Table">
            {/* Header outside of scroll container for vertical sticky, inside for horizontal scroll */}
            <TableHeader columns={COLUMNS} sortConfig={sortConfig} onSort={handleSort} />
            
            {/* Scrollable Body */}
            <div
              ref={parentRef}
              className="flex-1 overflow-y-auto"
            >
              {isLoading ? (
                <div className="p-12 flex justify-center">
                  <LoadingSpinner size={32} />
                </div>
              ) : users.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  No users found matching your criteria.
                </div>
              ) : (
                <div
                  className="relative w-full"
                  style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const user = users[virtualRow.index];
                    return (
                      <TableRow
                        key={virtualRow.key}
                        user={user}
                        isEven={virtualRow.index % 2 === 0}
                        style={{
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pagination Container */}
      <div className="border-t border-gray-200 flex-shrink-0 relative">
        {isFetching && !isLoading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-100 overflow-hidden">
            <div className="h-full bg-blue-500 w-1/3 animate-[slide_1s_ease-in-out_infinite]" />
          </div>
        )}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          totalItems={totalCount}
          pageSize={limit}
        />
      </div>
    </div>
  );
};

export default DataTable;
