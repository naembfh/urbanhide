import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import clientAxiosInstance from "@/app/lib/AxiosInstance/clientAxiosInstance";
import { toast } from "sonner";

// Fetch all users
export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await clientAxiosInstance.get("/auth/all-users");
      console.log(data.data);
      return data.data;
    },
    onError: () => {
      toast.error("Failed to fetch users. Please try again.");
    },
  });

// Add user
export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userData: any) => {
      const { data } = await clientAxiosInstance.post("/auth/signup", userData);
      return data;
    },
    onSuccess: () => {
      toast.success("User created successfully.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to create user. Please try again.");
    },
  });
};

// Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { userId: string; role: string }) => {
      const { data: responseData } = await clientAxiosInstance.patch(`/auth/update-role`, data);
      return responseData;
    },
    onSuccess: () => {
      toast.success("User role updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to update user role. Please try again.");
    },
  });
};

// Delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await clientAxiosInstance.delete(`/auth/${userId}`);
      return data;
    },
    onSuccess: () => {
      toast.success("User deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to delete user. Please try again.");
    },
  });
};
