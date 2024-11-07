"use client";
import React from "react";
import Image from "next/image";


const HeroSection: React.FC = () => {
  return (
    <section className="relative  text-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Redefine Your Style with <span className="text-blue-400">Urban Hide</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Elevate your wardrobe with premium-quality jackets, bags, and accessories designed for the modern urban explorer.
          </p>
          <a
            href="/products"
            className="bg-blue-500 text-white py-3 px-8 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-400 transition duration-200"
          >
            Explore Collection
          </a>
        </div>

        {/* Hero Image */}
        <div className="relative md:w-1/2">
          <Image
            src="https://www.vintage-leather.co.uk/cdn/shop/articles/Leather-Accessories_fdc3420e-3672-4521-8f8a-62d96dbc2650.jpg?v=1703524481&width=1200"
            alt="Featured Product"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-10 rounded-lg"></div>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
    </section>
  );
};

export default HeroSection;
