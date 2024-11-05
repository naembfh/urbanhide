// src/lib/productService.ts

import axiosInstance from "@/app/lib/AxiosInstance";


export const getAllProducts = async () => {
  const res = await axiosInstance.get("/items/all");
  return res.data;
};

export const getProductById = async (productId: string) => {
    const res = await axiosInstance.get(`/product/${productId}`);
    return res.data;
  };

export const getCategories = async () => {
  const res = await axiosInstance.get("/category/all");
  return res.data;
};
