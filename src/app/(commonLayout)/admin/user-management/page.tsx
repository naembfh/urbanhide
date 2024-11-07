"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useUsers, useAddUser, useUpdateRoleUser, useDeleteUser, useUpdateProfile } from "@/hooks/user.hook";
import Loading from "@/app/components/Loading";
import AdminDashboard from "@/app/components/DashboardNavigation";

const UserManagement = () => {
  const { data: users, isLoading } = useUsers();
  const addUserMutation = useAddUser();
  const updateProfileMutation = useUpdateProfile();
  const updateRoleMutation = useUpdateRoleUser();
  const deleteUserMutation = useDeleteUser();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    image: null as File | null,
    existingImage: "",
  });
  const [editUserId, setEditUserId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleRoleChange = async (userId: string, role: string) => {
    await updateRoleMutation.mutateAsync({ userId, role });
  };

  const openModal = (user?: any) => {
    if (user) {
      setEditMode(true);
      setEditUserId(user._id);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        address: user.address || "",
        password: "",
        image: null,
        existingImage: user.img || "",
      });
    } else {
      setEditMode(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        image: null,
        existingImage: "",
      });
      setEditUserId(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      image: null,
      existingImage: "",
    });
    setEditUserId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const profileData = new FormData();
    profileData.append("name", formData.name);
    profileData.append("email", formData.email);
    profileData.append("phone", formData.phone);
    profileData.append("address", formData.address);
    if (formData.password) profileData.append("password", formData.password);
    if (formData.image) profileData.append("image", formData.image);

    if (isEditMode && editUserId) {
      profileData.append("userId", editUserId); // Include user ID for editing
      await updateProfileMutation.mutateAsync(profileData);
    } else {
      await addUserMutation.mutateAsync(profileData);
    }
    closeModal();
  };

  if (isLoading) return <Loading />;

  return (
    <>
    <AdminDashboard></AdminDashboard>
    <div className="p-4 relative">
      <div className="flex justify-end mb-4">
        <Button color="success" size="sm" onClick={() => openModal()}>
          Add User
        </Button>
      </div>

      <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
            <th className="border border-gray-300 p-2 text-left">Phone</th>
            <th className="border border-gray-300 p-2 text-left">Role</th>
            <th className="border border-gray-300 p-2 text-left">Address</th>
            <th className="border border-gray-300 p-2 text-left">Image</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any) => (
            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.phone || "N/A"}</td>
              <td className="border border-gray-300 p-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </td>
              <td className="border border-gray-300 p-2">{user.address || "N/A"}</td>
              <td className="border border-gray-300 p-2">
                {user.img && <img src={user.img} alt="User" className="w-10 h-10 rounded-full" />}
              </td>
              <td className="border border-gray-300 p-2">
                <div className="flex space-x-2">
                  <Button color="primary" size="sm" onClick={() => openModal(user)}>
                    Edit
                  </Button>
                  <Button color="danger" size="sm" onClick={() => deleteUserMutation.mutate(user._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="relative max-w-lg w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
              {isEditMode ? "Edit User" : "Add User"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Name" name="name" fullWidth value={formData.name} onChange={handleInputChange} />
              <Input label="Email" name="email" fullWidth value={formData.email} onChange={handleInputChange} />
              <Input label="Phone" name="phone" fullWidth value={formData.phone} onChange={handleInputChange} />
              <Input label="Address" name="address" fullWidth value={formData.address} onChange={handleInputChange} />
              {!isEditMode && (
                <Input label="Password" name="password" type="password" fullWidth value={formData.password} onChange={handleInputChange} />
              )}
              <Input label="Image" name="image" type="file" fullWidth onChange={handleFileChange} />
              {formData.existingImage && <img src={formData.existingImage} alt="Current" className="w-16 h-16 rounded-full mt-2" />}
              <div className="mt-4 flex justify-end space-x-2">
                <Button color="danger" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" color="success">
                  {isEditMode ? "Update User" : "Add User"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default UserManagement;
