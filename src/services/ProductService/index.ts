import clientAxiosInstance from "@/app/lib/AxiosInstance/clientAxiosInstance";



// Create product
export const addProduct = async (productData: FormData) => {
  const { data } = await clientAxiosInstance.post("/product/create", productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Get all products
export const getAllProducts = async () => {
  const { data } = await clientAxiosInstance.get("/product/all");
  return data;
};

// Update product
export const updateProduct = async (productId: string, productData: FormData) => {
  const { data } = await clientAxiosInstance.put(`/product/edit/${productId}`, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Delete product
export const deleteProduct = async (productId: string) => {
  const { data } = await clientAxiosInstance.delete(`/product/delete/${productId}`);
  return data;
};
