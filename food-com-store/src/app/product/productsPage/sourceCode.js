// Helper function to fetch products from API
export async function fetchProducts({ selectedCategory, searchTerm, sortOrder, sortDirection, page, limit, setLoading, setError, setProducts, setAllSearchResults }) {
    setLoading(true);
    setError(null);
    try {
      let apiUrl = 'https://next-ecommerce-api.vercel.app/products?';
      const params = new URLSearchParams();
  
      if (searchTerm) {
        params.append('search', searchTerm);
        params.append('limit', '3000'); // Fetch all for search
      } else {
        params.append('limit', limit);
        params.append('skip', (page - 1) * limit); // Pagination
      }
  
      if (selectedCategory) {
        params.append('category', selectedCategory);
      }
  
      if (sortOrder) {
        params.append('sortBy', sortOrder);
        if (sortDirection) {
          params.append('order', sortDirection);
        }
      }
  
      apiUrl += params.toString();
  
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await res.json();
  
      if (searchTerm) {
        const sortedData = data.sort((a, b) => {
          if (sortOrder === 'price') {
            return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
          }
          if (sortOrder === 'rating') {
            return sortDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating;
          }
          return 0;
        });
  
        const start = (page - 1) * limit;
        const end = start + limit;
        setProducts(sortedData.slice(start, end));
        setAllSearchResults(sortedData);
      } else {
        setProducts(data);
        setAllSearchResults([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  // Helper function to fetch categories
  export async function fetchCategories() {
    const res = await fetch('https://next-ecommerce-api.vercel.app/categories');
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    return res.json();
  }
  
  // Helper function to build query string for URL
  export function buildQueryString({ category, search, sortBy, order, page }) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    if (sortBy) params.append('sortBy', sortBy);
    if (order) params.append('order', order);
    if (page) params.append('page', page);
    return params.toString();
  }
  