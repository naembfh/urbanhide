// components/FilterSidebar.tsx
"use client"
import { useState } from "react";

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  rating: number;
}

interface FilterSidebarProps {
  products: Product[];
}

const FilterSidebar = ({ products }: FilterSidebarProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleFilter = (criteria: string) => {
    const result = products.filter((product) =>
      product.title.toLowerCase().includes(criteria.toLowerCase())
    );
    setFilteredProducts(result);
  };

  return (
    <div className="w-1/4 p-4 border-2 border-white bg-[#fffaf0] dark:bg-black hidden sm:block">
      <h2 className="font-bold mb-4">FILTERS</h2>
      <button onClick={() => handleFilter("Satchel")}>Filter by Satchel</button>
      {/* Add more filter options as needed */}
    </div>
  );
};

export default FilterSidebar;
