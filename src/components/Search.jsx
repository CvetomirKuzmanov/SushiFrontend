import React, { useState } from 'react';

export default function Search({ onSearch, onPriceFilter, onClearFilters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [priceSlider, setPriceSlider] = useState(100);

  const handleSearchInput = (e) => setSearchTerm(e.target.value);
  const handleSearch = () => onSearch(searchTerm);
  const handleKeyPress = (e) => e.key === 'Enter' && handleSearch();

  const handlePriceSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceSlider(value);
    setMaxPrice(value);
  };

  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

  const applyFilters = () => {
    onPriceFilter({
      min: minPrice === '' ? 0 : parseInt(minPrice),
      max: maxPrice === '' ? 200 : parseInt(maxPrice)
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setPriceSlider(100);
    onClearFilters();
  };

  return (
    <div className="w-full sm:max-w-[280px] bg-gray-100 rounded-lg p-5 mt-10 sm:mt-0 shadow-md sticky top-5 h-fit">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Search Products</h3>
        <div className="flex border border-gray-300 rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 px-4 py-2 border-none focus:outline-none"
            value={searchTerm}
            onChange={handleSearchInput}
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-gray-900 text-white px-4 hover:bg-gray-700 transition"
            onClick={handleSearch}
          >
            🔍
          </button>
        </div>
      </div>

      <div className="mb-6 border-b pb-5 border-gray-200">
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="mb-3">
          <input
            type="range"
            min="0"
            max="200"
            value={priceSlider}
            className="w-full"
            onChange={handlePriceSliderChange}
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min"
            className="w-20 px-2 py-1 border border-gray-300 rounded"
            min="0"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-20 px-2 py-1 border border-gray-300 rounded"
            min="0"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>

      <button
        className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 transition mb-3"
        onClick={applyFilters}
      >
        Apply Filters
      </button>
      <button
        className="w-full border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
        onClick={clearFilters}
      >
        Clear All
      </button>
    </div>
  );
}
