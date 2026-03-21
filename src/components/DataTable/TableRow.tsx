import React from 'react';
import type { User } from '../../hooks/useDataFetch';

interface TableRowProps {
  user: User;
  style: React.CSSProperties;
  isEven: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ user, style, isEven }) => {
  return (
    <div
      className={`absolute top-0 left-0 w-full flex items-center border-b border-gray-100 ${
        isEven ? 'bg-white' : 'bg-gray-50/50'
      } hover:bg-blue-50 transition-colors duration-150`}
      style={style}
      role="row"
    >
      <div className="px-6 py-2 truncate" style={{ width: '80px', flexShrink: 0 }} role="cell">
        <span className="font-mono text-sm text-gray-500">{user.id}</span>
      </div>
      <div className="px-6 py-2 truncate font-medium text-gray-900" style={{ flex: 1 }} role="cell">
        {user.name}
      </div>
      <div className="px-6 py-2 truncate text-gray-500" style={{ flex: 1.5 }} role="cell">
        {user.email}
      </div>
      <div className="px-6 py-2 truncate text-gray-700" style={{ flex: 1.5 }} role="cell">
        {user.company}
      </div>
      <div className="px-6 py-2 truncate" style={{ width: '120px', flexShrink: 0 }} role="cell">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
          user.role === 'Editor' ? 'bg-blue-100 text-blue-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {user.role}
        </span>
      </div>
      <div className="px-6 py-2 truncate" style={{ width: '100px', flexShrink: 0 }} role="cell">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {user.status}
        </span>
      </div>
    </div>
  );
};

// Use memo to prevent re-renders when parent scrolling happens
export default React.memo(TableRow);
