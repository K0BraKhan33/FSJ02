// src/app/product/components/Pagination.js

import React from 'react';

const Pagination = ({ page, handlePageChange, productsLength, limit }) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-200 text-gray-900 rounded"
      >
        Previous
      </button>
      <span className="self-center">Page {page}</span>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={productsLength < limit}
        className="px-4 py-2 bg-gray-200 text-gray-600 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
