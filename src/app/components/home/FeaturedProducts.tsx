"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface FeaturedProductsProps {
  featuredProducts: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ featuredProducts }) => {
  return (
    <section className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured <span className="text-blue-500">Products</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div className="relative group">
                {/* Product Image */}
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />

                {/* Product Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-4">
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  <p className="text-lg text-gray-300">${product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-gray-600 rounded-full blur-3xl opacity-20"></div>
    </section>
  );
};

export default FeaturedProducts;
