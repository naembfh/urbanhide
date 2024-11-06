"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Admin Dashboard
      </h1>
      <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
        <Link href="/admin/product-management">
          <Button color="primary" size="lg" className="w-full sm:w-auto">
            Product Management
          </Button>
        </Link>
        <Link href="/admin/category-management">
          <Button color="secondary" size="lg" className="w-full sm:w-auto">
            Category Management
          </Button>
        </Link>
        <Link href="/admin/order-management">
          <Button color="secondary" size="lg" className="w-full sm:w-auto">
            Order Management
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
