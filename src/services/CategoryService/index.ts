import clientAxiosInstance from "@/app/lib/AxiosInstance/clientAxiosInstance";

// Create category
export const addCategory = async (categoryData: FormData) => {
  const { data } = await clientAxiosInstance.post("/category/create", categoryData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Get all categories
export const getAllCategories = async () => {
  const { data } = await clientAxiosInstance.get("/category/all");
  return data;
};

// Update category
export const updateCategory = async (categoryId: string, categoryData: FormData) => {
  const { data } = await clientAxiosInstance.put(`/category/edit/${categoryId}`, categoryData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// Delete category
export const deleteCategory = async (categoryId: string) => {
  const { data } = await clientAxiosInstance.delete(`/category/delete/${categoryId}`);
  return data;
};
