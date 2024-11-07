import React from 'react';
import { Navbar } from '../components/Navbar';
import { ReactNode } from 'react';
import Footer from '../components/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
     <main className='min-h-screen dark:from-blue-900 via-black to-gray-900'>
     {children}
     </main>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
