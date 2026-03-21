import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = '', size = 24 }) => {
  return (
    <div className={`flex justify-center items-center ${className}`} role="status" aria-label="Loading">
      <Loader2 size={size} className="animate-spin text-blue-500" />
    </div>
  );
};

export default LoadingSpinner;
