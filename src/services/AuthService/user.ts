import clientAxiosInstance from "@/app/lib/AxiosInstance/clientAxiosInstance";

// Fetch all users
export const getAllUsers = async () => {
  const res = await clientAxiosInstance.get("/auth/all-users");
  return res.data;
};

// Create a new user
export const createUser = async (payload: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: "ADMIN" | "USER";
  address?: string;
  img?: string;
}) => {
  const res = await clientAxiosInstance.post("/auth/signup", payload);
  return res.data;
};

// Update user role
export const updateUserRole = async ({
  userId,
  newRole,
}: {
  userId: string;
  newRole: "ADMIN" | "USER";
}) => {
  const res = await clientAxiosInstance.patch("/auth/update-role", {
    userId,
    newRole,
  });
  return res.data;
};

// Update user profile
export const updateUserProfile = async (payload: {
  name?: string;
  phone?: string;
  address?: string;
  img?: string;
}) => {
  const res = await clientAxiosInstance.patch("/auth/update-profile", payload);
  return res.data;
};

// Delete a user
export const deleteUser = async (userId: string) => {
  const res = await clientAxiosInstance.delete(`/auth/${userId}`);
  return res.data;
};
