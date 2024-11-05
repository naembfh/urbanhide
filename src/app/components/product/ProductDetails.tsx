import React from 'react';
import Review from '../review/Review';

const ProductDetails = ({productId}) => {
  return (
    <>
      <Review productId={productId}></Review>
    </>
  );
};

export default ProductDetails;