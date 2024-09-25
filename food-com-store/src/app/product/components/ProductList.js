// src/app/product/components/ProductList.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductList = ({ products, imageIndex, handleImageChange, selectedCategory, searchTerm, sortOrder, sortDirection, page, buildQueryString }) => {
  return (
    <div>
      {products.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          No items found for: {searchTerm}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-400 border p-4 rounded shadow-sm">
              <div className="relative">
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageChange(product.id, 'prev')}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-black px-2 py-1 rounded"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={() => handleImageChange(product.id, 'next')}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-black px-2 py-1 rounded"
                    >
                      &gt;
                    </button>
                  </>
                )}
                <Link
                  href={`/product/productsPage/${product.id}?${buildQueryString({
                    category: selectedCategory,
                    search: searchTerm,
                    sortBy: sortOrder,
                    order: sortDirection,
                    page
                  })}`}
                >
                  <Image
                    src={product.images[imageIndex[product.id] || 0]}
                    alt={product.title}
                    className="w-[34vw] h-fit object-cover rounded"
                    width={600}
                    height={600}
                    loading='lazy'
                  />
                </Link>
              </div>
              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
              <p className="text-sm text-black">Category: {product.category}</p>
              <div className="flex flex-wrap mt-2">
                {product.tags.map((tag) => (
                  <p key={tag} className="mr-2 mb-1 bg-gray-200 px-2 py-1 rounded text-sm text-black">{tag}</p>
                ))}
              </div>
              <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
              <p className="mt-1 text-black">Rating: {product.rating}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
