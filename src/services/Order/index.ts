import clientAxiosInstance from "@/app/lib/AxiosInstance/clientAxiosInstance";

// Fetch order history by user email
export const getOrderHistory = async () => {
  const res = await clientAxiosInstance.get('/order/history');
  return res.data;
};

// Create a new order
export const createOrder = async ({
  shippingDetails,
  cartItems,
  totalAmount,
  email,
}: {
  shippingDetails: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
  };
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }>;
  totalAmount: number;
  email: string;
}) => {
  const res = await clientAxiosInstance.post("/order", {
    shippingDetails,
    cartItems,
    totalAmount,
    email,
  });
  return res.data;
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: string) => {
  const res = await clientAxiosInstance.patch(`/order/${orderId}/status`, {
    status,
  });
  return res.data;
};

// Create Stripe checkout session
export const createCheckoutSession = async ({
  cartItems,
  shippingDetails,
  email,
}: {
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }>;
  shippingDetails: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
  };
  email: string;
}) => {
  const res = await clientAxiosInstance.post("/order/create-checkout-session", {
    cartItems,
    shippingDetails,
    email,
  });
  return res.data;
};
