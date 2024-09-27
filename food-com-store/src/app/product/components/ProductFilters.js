// src/app/product/components/ProductFilters.js

import React from 'react';



const ProductFilters = ({ 
  categories, 
  selectedCategory, 
  handleCategoryChange, 
  sortOrder, 
  sortDirection, 
  handleSortChange, 
  searchInput, 
  setSearchInput, 
  handleSearch, 
  handleKeyDown,
  resetFilters
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      {/* Category dropdown */}
      <div className="w-full md:w-1/3">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          <option value="">All Categories</option>
          {/* Render categories dynamically here */}
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Sort by dropdown */}
      <div className="w-full md:w-1/3">
        <select
          value={`${sortOrder}:${sortDirection}`}
          onChange={handleSortChange}
          className="w-full p-2 border rounded text-black"
        >
          <option value="">Sort By</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="rating:asc">Rating: Low to High</option>
          <option value="rating:desc">Rating: High to Low</option>
        </select>
      </div>

      {/* Search bar */}
      <div className="w-full md:w-2/3">
        <div className="flex">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search by product title..."
            className="w-[25vw] p-2 border rounded text-black"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-500 w-[7vw] text-white px-4 py-2 rounded"
          >
            Search
          </button>
          <button onClick={resetFilters} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
            Reset Filters
          </button>
        </div>

      
      </div>
    </div>
  );
};

export default ProductFilters;
