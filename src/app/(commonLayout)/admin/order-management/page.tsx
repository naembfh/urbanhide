"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/user.provider";
import { toast } from "sonner";
import { getOrderHistory, updateOrderStatus } from "@/services/Order";
import Image from "next/image";

interface Order {
  _id: string;
  date: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }>;
  total: number;
  status: string;
  shippingDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  };
}

const MyOrdersPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderHistory();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, status);
      toast.success("Order status updated successfully!");
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border rounded-lg p-4 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
                <p className="text-gray-500 text-sm">
                  Date: {new Date(order.date).toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm">
                  Name: {order.shippingDetails.name}
                </p>
                <p className="text-gray-600 text-sm">
                  Email: {order.shippingDetails.email}
                </p>
              </div>
              {user?.role === "ADMIN" ? (
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border rounded-md p-2 text-gray-700"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Received">Received</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              ) : (
                <p
                  className={`text-sm font-medium ${
                    order.status === "Pending"
                      ? "text-yellow-500"
                      : order.status === "Shipped"
                      ? "text-blue-500"
                      : order.status === "Received"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Status: {order.status}
                </p>
              )}
            </div>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <Image
                    src={item.imageUrl || "/placeholder-image.png"}
                    alt={item.name || "Product Image"}
                    width={64}
                    height={64}
                    className="object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name || "Unnamed Product"}</p>
                    <p className="text-gray-500">
                      Quantity: {item.quantity || 0} | Price: $
                      {item.price ? item.price.toFixed(2) : "0.00"}
                    </p>
                  </div>
                  <p className="font-bold">
                    $
                    {item.price && item.quantity
                      ? (item.price * item.quantity).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="font-semibold">
                Total: ${order.total ? order.total.toFixed(2) : "0.00"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
