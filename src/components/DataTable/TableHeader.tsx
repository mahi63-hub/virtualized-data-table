import React from 'react';
import { ArrowDownAZ, ArrowUpZA, ArrowUpDown } from 'lucide-react';

export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  key: string;
  order: SortOrder;
}

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

interface TableHeaderProps {
  columns: Column[];
  sortConfig: SortConfig | null;
  onSort: (key: string) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns, sortConfig, onSort }) => {
  const renderSortIcon = (columnKey: string) => {
    if (sortConfig?.key !== columnKey) {
      return <ArrowUpDown className="ml-1 h-4 w-4 text-gray-400" aria-hidden="true" />;
    }
    return sortConfig.order === 'asc' ? (
      <ArrowDownAZ className="ml-1 h-4 w-4 text-blue-600" aria-hidden="true" />
    ) : (
      <ArrowUpZA className="ml-1 h-4 w-4 text-blue-600" aria-hidden="true" />
    );
  };

  return (
    <div className="sticky top-0 z-10 flex border-b border-gray-200 bg-gray-50 uppercase text-xs font-semibold text-gray-500 tracking-wider">
      {columns.map((column) => (
        <div
          key={column.key}
          className={`px-6 py-3 flex items-center ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
          style={{ width: column.width || 'flex-1', flexShrink: 0, flexGrow: column.width ? 0 : 1 }}
          onClick={() => column.sortable && onSort(column.key)}
          role={column.sortable ? 'button' : 'columnheader'}
          aria-sort={
            sortConfig?.key === column.key
              ? sortConfig.order === 'asc'
                ? 'ascending'
                : 'descending'
              : 'none'
          }
          tabIndex={column.sortable ? 0 : -1}
          onKeyDown={(e) => {
            if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
              onSort(column.key);
            }
          }}
        >
          {column.label}
          {column.sortable && renderSortIcon(column.key)}
        </div>
      ))}
    </div>
  );
};

export default TableHeader;
