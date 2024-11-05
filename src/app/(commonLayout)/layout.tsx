import React from 'react';
import { Navbar } from '../components/Navbar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
      footer
    </div>
  );
};

export default Layout;
