import React from 'react';
import Review from '../review/Review';

interface ProductDetailsProps {
  productId: string; // Specify the expected type of productId, e.g., string
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  return (
    <>
      <Review productId={productId}></Review>
    </>
  );
};

export default ProductDetails;
