"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useUser } from "@/context/user.provider";
import { toast } from "sonner";
import { createCheckoutSession } from "@/services/Order";

// Initialize Stripe
const stripePromise = loadStripe("pk_test_51L0YqPIFPHmtypU8Dw9vs6Mt8mOttFAvCqhuo6VEUzNXq9hUe6NQDT5NF5hCrJtg40phCRLRaMDZG4tTHJGsyUWs00QTV58MlD");

const CheckoutForm = () => {
  const { user } = useUser();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  const [shippingDetails, setShippingDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    const isComplete = Object.values(shippingDetails).every((field) => field.trim() !== "");
    setIsFormComplete(isComplete);
  }, [shippingDetails]);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (!isFormComplete) {
      toast.error("Please complete all fields!");
      return;
    }

    // Save shipping details to local storage
    localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));

    const stripe = await stripePromise;
    if (!stripe) {
      toast.error("Stripe initialization failed!");
      return;
    }

    try {
      // Use the service to create a checkout session
      const { id } = await createCheckoutSession({
        cartItems,
        shippingDetails,
        email: user?.email || shippingDetails.email,
      });

      // Redirect to Stripe checkout
      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        toast.error(`Stripe checkout error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
        <div className="space-y-4">
          {(Object.keys(shippingDetails) as Array<keyof typeof shippingDetails>).map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={shippingDetails[field]}
              onChange={handleShippingChange}
              required
              className="w-full p-2 border rounded-md"
            />
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">Order Summary</h2>
        <div className="bg-gray-100 p-4 rounded-md">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 mb-2">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={64}
                height={64}
                className="object-cover rounded-md"
              />
              <div className="text-gray-700">
                <p>{item.name} x {item.quantity}</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <p className="text-gray-700 font-bold mt-2">Total: ${totalAmount.toFixed(2)}</p>
        </div>

        <button
          onClick={handleCheckout}
          className={`w-full mt-6 py-2 px-4 rounded-md transition ${
            isFormComplete
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-red-500 text-white cursor-not-allowed"
          }`}
          disabled={!isFormComplete}
        >
          Proceed to Stripe Checkout
        </button>
      </form>
    </div>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutPage;



// Basic Test Card
// Card Number: 4242 4242 4242 4242
// Expiration Date: Any future date (e.g., 12/34)
// CVC: Any 3-digit number (e.g., 123)