"use client";
import { addToCart } from "@/redux/features/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    rating: number;
    category: {
      name: string;
    };
    images: string[]; // Array of image URLs
  };
}

const ProductInformation: React.FC<ProductDetailsProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1, // Default quantity of 1 when adding
        imageUrl: product.images[0], // Use the first image as the primary image for the cart
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
      <p className="text-sm text-gray-500 uppercase">{product.category.name}</p>

      {/* Product Rating */}
      <div className="flex items-center space-x-2">
        <div className="text-yellow-500 flex">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={index < product.rating ? "text-yellow-500" : "text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {product.rating || 0} out of 5 stars
        </span>
      </div>

      {/* Product Price */}
      <p className="text-2xl font-semibold text-gray-800">${product.price}</p>

      {/* Product Description */}
      <p className="text-gray-700">{product.description}</p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full py-3 px-4 bg-yellow-600 text-white rounded-md font-semibold hover:bg-yellow-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInformation;
