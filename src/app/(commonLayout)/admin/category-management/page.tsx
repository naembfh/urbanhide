"use client";
import React, { useState } from "react";
import { Button, Modal, Input } from "@nextui-org/react";
import { useAddCategory, useCategories, useDeleteCategory, useUpdateCategory } from "@/hooks/category.hook";
import AdminDashboard from "@/app/components/DashboardNavigation";


const CategoryList = () => {
  const { data: categories, isLoading } = useCategories();
  const addCategoryMutation = useAddCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", image: null as File | null });
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);

  const openModal = (category?: any) => {
    if (category) {
      setEditMode(true);
      setEditCategoryId(category._id);
      setFormData({ name: category.name, description: category.description, image: null });
    } else {
      setEditMode(false);
      setFormData({ name: "", description: "", image: null });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ name: "", description: "", image: null });
    setEditCategoryId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData = new FormData();
    categoryData.append("name", formData.name);
    categoryData.append("description", formData.description);
    if (formData.image) categoryData.append("image", formData.image);

    if (isEditMode && editCategoryId) {
      await updateCategoryMutation.mutateAsync({ categoryId: editCategoryId, categoryData });
    } else {
      await addCategoryMutation.mutateAsync(categoryData);
    }
    closeModal();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
    <AdminDashboard></AdminDashboard>
    <div className="p-4 relative">
      <div className="flex justify-end mb-4">
        <Button color="success" size="sm" onClick={() => openModal()}>
          Add Category
        </Button>
      </div>

      {/* Table for categories */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border p-2 text-left text-gray-700 dark:text-gray-300">Category Name</th>
            <th className="border p-2 text-left text-gray-700 dark:text-gray-300">Description</th>
            <th className="border p-2 text-left text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category: any) => (
            <tr key={category._id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="border p-2">{category.name}</td>
              <td className="border p-2">{category.description}</td>
              <td className="border p-2">
                <div className="flex space-x-2">
                  <Button color="primary" size="sm" onClick={() => openModal(category)}>
                    Edit
                  </Button>
                  <Button color="danger" size="sm" onClick={() => deleteCategoryMutation.mutate(category._id)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing categories */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="relative max-w-lg w-full mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
              {isEditMode ? "Edit Category" : "Add Category"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Category Name"
                name="name"
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="dark:bg-gray-700 dark:text-gray-300"
              />
              <Input
                label="Description"
                name="description"
                fullWidth
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="dark:bg-gray-700 dark:text-gray-300"
              />
              <Input
                label="Category Image"
                name="image"
                type="file"
                onChange={(e) => setFormData({ ...formData, image: e.target.files ? e.target.files[0] : null })}
                className="dark:bg-gray-700 dark:text-gray-300"
              />
              <div className="mt-4 flex justify-end space-x-2">
                <Button color="danger" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" color="success">
                  {isEditMode ? "Update Category" : "Add Category"}
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

export default CategoryList
