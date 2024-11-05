import { addProduct, deleteProduct, getAllProducts, updateProduct } from "@/services/ProductService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        return await getAllProducts();
      } catch (error: any) {
        toast.error(`Failed to fetch products: ${error.message}`);
        throw error; // Re-throw to let react-query handle the error state
      }
    },
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productData: FormData) => {
      try {
        return await addProduct(productData);
      } catch (error: any) {
        toast.error(`Failed to add product: ${error.message}`);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Product added successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, productData }: { productId: string; productData: FormData }) => {
      try {
        return await updateProduct(productId, productData);
      } catch (error: any) {
        toast.error(`Failed to update product: ${error.message}`);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (productId: string) => {
      try {
        return await deleteProduct(productId);
      } catch (error: any) {
        toast.error(`Failed to delete product: ${error.message}`);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
