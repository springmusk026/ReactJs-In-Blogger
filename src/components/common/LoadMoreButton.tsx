import React from 'react';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading?: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
  >
    {loading ? 'Loading...' : 'Load More'}
  </button>
);

export default LoadMoreButton;