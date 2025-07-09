import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import Pagination from '../components/Pagination';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [sortType, setSortType] = useState('Featured');
  const itemsPerPage = 7; // Changed to 4 items per page

  useEffect(() => {
    fetch('/src/products.json')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to load products:', err));
  }, []);

  const getFilteredAndSortedProducts = () => {
    let result = [...products];

    // Sorting
    switch (sortType) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Name: A to Z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name: Z to A':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break; // Featured or unknown sort
    }

    return result;
  };

  const handleSortChange = (e) => setSortType(e.target.value);

  const filteredProducts = getFilteredAndSortedProducts();
  const endOffset = itemOffset + itemsPerPage;
  const currentProducts = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
    window.scrollTo(0, 0);
  };

  return (
    <section className="py-10">
      <div className="container mx-auto ">
        {/* Centered Content */}
        <div className="flex flex-col items-center gap-8">
          {/* Header and Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full max-w-7xl mb-6 gap-4 px-4">
            <h1 className="text-2xl font-semibold">All Products</h1>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <label htmlFor="sort-by" className="text-sm font-medium">
                  Sort by:
                </label>
                <select
                  id="sort-by"
                  value={sortType}
                  onChange={handleSortChange}
                  className="border border-gray-300 px-3 py-2 rounded-md text-sm"
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Name: A to Z</option>
                  <option>Name: Z to A</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl w-full px-4">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Product key={product.product_id || product.id} {...product} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No products match your search criteria.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredProducts.length > itemsPerPage && (
            <div className="mt-10">
              <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
