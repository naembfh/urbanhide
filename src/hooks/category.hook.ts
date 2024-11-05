import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "@/services/CategoryService";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        return await getAllCategories();
      } catch (error: any) {
        toast.error(`Failed to fetch categories: ${error.message}`);
        throw error; // Re-throw the error to ensure the query handles it correctly
      }
    }
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      toast.success("Category added successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error(`Failed to add category: ${error.message}`);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId, categoryData }: { categoryId: string; categoryData: FormData }) =>
      updateCategory(categoryId, categoryData),
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error(`Failed to update category: ${error.message}`);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: any) => {
      toast.error(`Failed to delete category: ${error.message}`);
    },
  });
};
