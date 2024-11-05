"use client";
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateQuantity, removeFromCart, clearCart } from '@/redux/features/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const subtotal = useSelector((state: RootState) => state.cart.subtotal);
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  const taxAmount = useSelector((state: RootState) => state.cart.taxAmount);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  const handleIncrement = (id: string) => dispatch(updateQuantity({ id, change: 'increment' }));
  const handleDecrement = (id: string) => dispatch(updateQuantity({ id, change: 'decrement' }));
  const handleRemove = (id: string) => dispatch(removeFromCart({ id }));
  const handleClearCart = () => dispatch(clearCart());

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {totalItems === 0 ? (
        <p className="text-gray-500">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full text-left">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Total</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-4">
                      <div className="flex items-center space-x-4">
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="p-4">${item.price.toFixed(2)}</td>
                    <td className="p-4 flex items-center space-x-2">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="px-2 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                      >
                        +
                      </button>
                    </td>
                    <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 border rounded-lg text-lg space-y-2">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${taxAmount.toFixed(2)}</p>
            <p className="font-bold text-xl">Total: ${totalAmount.toFixed(2)}</p>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handleClearCart}
              className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
            <button
              className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              onClick={() => alert("Proceed to Checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
