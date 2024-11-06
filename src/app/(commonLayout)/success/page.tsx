"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { useUser } from "@/context/user.provider";
import { clearCart } from "@/redux/features/cartSlice"; // Import clearCart action
import { createOrder } from "@/services/Order";

const SuccessPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useUser();

  // Fetch cart items and total amount from Redux
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  const [shippingDetails, setShippingDetails] = useState(null);

  const handleCreateOrder = useCallback(
    async (shippingDetails: any, cartItems: any[], totalAmount: number) => {
      try {
        await createOrder({
          shippingDetails,
          cartItems,
          totalAmount,
          email: user?.email || shippingDetails.email,
        });

        toast.success("Order created successfully!");

        // Clear shipping details from local storage
        localStorage.removeItem("shippingDetails");

        // Clear the cart by dispatching Redux action
        dispatch(clearCart());

        // Redirect to the appropriate page after order creation
        setTimeout(() => {
          router.push("/my-order" );
        }, 3000);
      } catch (error) {
        console.error("Error creating order:", error);
        toast.error("Failed to create order. Please try again.");
      }
    },
    [dispatch, router, user]
  );

  useEffect(() => {
    // Retrieve shipping details from local storage
    const storedShippingDetails = localStorage.getItem("shippingDetails");

    if (storedShippingDetails) {
      const parsedDetails = JSON.parse(storedShippingDetails);
      setShippingDetails(parsedDetails);
      handleCreateOrder(parsedDetails, cartItems, totalAmount);
    } else {
      // Redirect to home if shipping details are missing
      router.push("/");
    }
  }, [cartItems, totalAmount, router, handleCreateOrder]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Thank You for Your Purchase!</h1>
      <p className="text-gray-600">We are processing your order.</p>
      <p className="text-gray-600">You will be redirected shortly...</p>
    </div>
  );
};

export default SuccessPage;
