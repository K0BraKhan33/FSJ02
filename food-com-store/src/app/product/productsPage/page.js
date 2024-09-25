'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { fetchProducts, fetchCategories, buildQueryString } from './sourceCode';

export default function ProductsPage({ searchParams }) {
  // State variables
  const [products, setProducts] = useState([]);
  const [allSearchResults, setAllSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.category || '');
  const [searchInput, setSearchInput] = useState(searchParams.search || '');
  const [searchTerm, setSearchTerm] = useState(searchParams.search || '');
  const [sortOrder, setSortOrder] = useState(searchParams.sortBy || '');
  const [sortDirection, setSortDirection] = useState(searchParams.order || '');
  const [page, setPage] = useState(searchParams.page ? parseInt(searchParams.page, 10) : 1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageIndex, setImageIndex] = useState({});
  const limit = 20;
  const router = useRouter();

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // Fetch products based on search, category, and filters
  useEffect(() => {
    fetchProducts({
      selectedCategory,
      searchTerm,
      sortOrder,
      sortDirection,
      page,
      limit,
      setLoading,
      setError,
      setProducts,
      setAllSearchResults,
    });
  }, [selectedCategory, searchTerm, sortOrder, sortDirection, page]);

  // Sync searchParams on component mount
  useEffect(() => {
    setSelectedCategory(searchParams.category || '');
    setSearchInput(searchParams.search || '');
    setSearchTerm(searchParams.search || '');
    setSortOrder(searchParams.sortBy || '');
    setSortDirection(searchParams.order || '');
    setPage(searchParams.page ? parseInt(searchParams.page, 10) : 1);
  }, [searchParams]);

  const handleSearch = () => {
    setSearchTerm(searchInput);
    const queryString = buildQueryString({
      category: selectedCategory,
      search: searchInput,
      sortBy: sortOrder,
      order: sortDirection,
      page: 1,
    });
    router.push(`/product/productsPage?${queryString}`);
    fetchProducts({
      selectedCategory,
      searchTerm: searchInput,
      sortOrder,
      sortDirection,
      page: 1,
      limit,
      setLoading,
      setError,
      setProducts,
      setAllSearchResults,
    });
    setPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const queryString = buildQueryString({
      category,
      search: searchTerm,
      sortBy: sortOrder,
      order: sortDirection,
      page: 1,
    });
    router.push(`/product/productsPage?${queryString}`);
    fetchProducts({
      selectedCategory: category,
      searchTerm,
      sortOrder,
      sortDirection,
      page: 1,
      limit,
      setLoading,
      setError,
      setProducts,
      setAllSearchResults,
    });
    setPage(1);
  };

  const handleSortChange = (e) => {
    const [sortBy, order] = e.target.value.split(':');
    setSortOrder(sortBy);
    setSortDirection(order === 'asc' ? 'asc' : 'desc');
    const queryString = buildQueryString({
      category: selectedCategory,
      search: searchTerm,
      sortBy,
      order,
      page: 1,
    });
    router.push(`/product/productsPage?${queryString}`);
    fetchProducts({
      selectedCategory,
      searchTerm,
      sortOrder: sortBy,
      sortDirection: order,
      page: 1,
      limit,
      setLoading,
      setError,
      setProducts,
      setAllSearchResults,
    });
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const queryString = buildQueryString({
      category: selectedCategory,
      search: searchTerm,
      sortBy: sortOrder,
      order: sortDirection,
      page: newPage,
    });
    router.push(`/product/productsPage?${queryString}`);
    fetchProducts({
      selectedCategory,
      searchTerm,
      sortOrder,
      sortDirection,
      page: newPage,
      limit,
      setLoading,
      setError,
      setProducts,
      setAllSearchResults,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleImageChange = (productId, direction) => {
    setImageIndex((prevIndex) => {
      const currentIndex = prevIndex[productId] || 0;
      const imagesCount = products.find((product) => product.id === productId)?.images.length || 0;
      const newIndex = direction === 'prev'
        ? (currentIndex - 1 + imagesCount) % imagesCount
        : (currentIndex + 1) % imagesCount;
      return { ...prevIndex, [productId]: newIndex };
    });
  };

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {error}
        <div className="mt-4">
          <button onClick={handleGoBack} className="ml-2 px-4 py-2 bg-gray-500 text-white rounded">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        sortOrder={sortOrder}
        sortDirection={sortDirection}
        handleSortChange={handleSortChange}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        handleKeyDown={handleKeyDown}
      />

      <ProductList
        products={products}
        imageIndex={imageIndex}
        handleImageChange={handleImageChange}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        sortOrder={sortOrder}
        sortDirection={sortDirection}
        page={page}
        buildQueryString={buildQueryString}
      />

      <Pagination
        page={page}
        handlePageChange={handlePageChange}
        productsLength={products.length}
        limit={limit}
      />
    </div>
  );
}
