// app/products/[productId]/page.tsx
import ImageGallery from "@/app/components/product/ImageGallery";
import ProductDetails from "@/app/components/product/ProductDetails";
import ProductInformation from "@/app/components/product/ProductInformation";
import { getProductById } from "@/services/Product";
import React from "react";


interface PageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: PageProps) => {
  const product = await getProductById(params.productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
   <>
    <div className="flex flex-col lg:flex-row gap-8 p-8">
      {/* Image Gallery */}
      <div className="lg:w-3/5">
        <ImageGallery images={product.images} />
      </div>

      {/* Product Details */}
      <div className="lg:w-2/5 space-y-8">
        <ProductInformation product={product} />
      </div>
    </div>
    <ProductDetails productId={product._id}></ProductDetails>
   </>
    
  );
};

export default ProductPage;
