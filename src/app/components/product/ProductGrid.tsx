"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  gender?: string;
  category?: { _id: string; name: string };
  rating?: number;
}

interface Category {
  _id: string;
  name: string;
}

interface ProductGridProps {
  products: Product[];
  categories: Category[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, categories }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceLimit, setPriceLimit] = useState(0);
  const [genderFilter, setGenderFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const prices = products.map((product) => product.price);
    setMaxPrice(Math.max(...prices));
    setPriceLimit(Math.max(...prices));
  }, [products]);

  const handleFilterChange = useCallback(() => {
    let filtered = products;

    if (priceLimit < maxPrice) {
      filtered = filtered.filter((product) => product.price <= priceLimit);
    }

    if (genderFilter) {
      filtered = filtered.filter((product) => product.gender === genderFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter((product) => product.category?._id === categoryFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [products, priceLimit, genderFilter, categoryFilter, sortOrder, maxPrice, searchQuery]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  const handlePriceLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceLimit(parseInt(e.target.value));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4 p-4 border-b lg:border-b-0 lg:border-r bg-gray-50 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">Filter by Price</h2>
        <div className="mb-4">
          <label className="block mb-1">Max Price: ${priceLimit}</label>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceLimit}
            onChange={handlePriceLimitChange}
            className="w-full"
          />
        </div>

       

        <div className="mb-4">
          <label className="block mb-1">Sort by Price:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Gender:</label>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
          >
            <option value="">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full lg:w-3/4 p-4">
      <div className="mb-4">
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
          />
        </div>
        <h2 className="text-lg font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {paginatedProducts.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div className="border p-4 rounded shadow-lg bg-white dark:bg-gray-900 cursor-pointer hover:shadow-xl transition-shadow duration-200">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={800}
                  height={600}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                  {product.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-2">${product.price}</p>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-xl ${
                        index < (product.rating || 0) ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-gray-500 dark:text-gray-400">
                    {product.rating || 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
