"use server";

import ProductList from "@/app/(commonLayout)/admin/product-management/page";
import { getCategories } from "@/services/Product";
import { getAllProducts } from "@/services/ProductService";
import ProductGrid from "./ProductGrid";



const ProductsPage = async () => {
  // Fetch data on the server
  const products = await getAllProducts();
  const categories = await getCategories();

  return <ProductGrid products={products} categories={categories} />;
};

export default ProductsPage;

