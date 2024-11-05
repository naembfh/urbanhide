

import { getCurrentUser } from '@/services/AuthService';
import { Button } from '@nextui-org/react';
import React from 'react';

import ProductsPage from '../components/product/ProductsPage';


const Home = () => {
   
   
    return (
       <>
  <ProductsPage></ProductsPage>
       </>
    );
};

export default Home;