

import { getCurrentUser } from '@/services/AuthService';
import { Button } from '@nextui-org/react';
import React from 'react';

import ProductsPage from '../components/product/ProductsPage';
import HeroSection from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import { getAllProducts } from '@/services/ProductService';


const Home = () => {
 
    const featuredProducts = [
        {
          _id: "672d00578cfc7bb86a53c6ef",
          name: "Highlands Quilted Leather Jacket",
          price: 300,
          images: ["https://res.cloudinary.com/dgnsuicgp/image/upload/v1731002453/s5gjeujtcsan1wzf0kgg.webp"],
        },
        {
          _id: "672cfeb98cfc7bb86a53c65c",
          name: "Grand Teton National Park L/S Tee",
          price: 23,
          images: ["https://res.cloudinary.com/dgnsuicgp/image/upload/v1731002042/immwhphiwmslugkupja9.webp"],
        },
        {
          _id: "672cfba48cfc7bb86a53c60f",
          name: "Limited Edition Roosevelt Leather Duffle Bag",
          price: 500,
          images: ["https://res.cloudinary.com/dgnsuicgp/image/upload/v1731001250/dhgp219cmmmlvkn8m4vs.webp"],
        },
        {
          _id: "672cfa5c8cfc7bb86a53c5d2",
          name: "Bridger Leather Down Jacket",
          price: 480,
          images: ["https://res.cloudinary.com/dgnsuicgp/image/upload/v1731000924/l4sdxslapnvsajmti35g.webp"],
        },
      ];
      
   
    return (
       <>
       <HeroSection></HeroSection>
  <ProductsPage></ProductsPage>
  <FeaturedProducts featuredProducts={featuredProducts} ></FeaturedProducts>
       </>
    );
};

export default Home;