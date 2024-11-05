
"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal, Input, Textarea, Image } from "@nextui-org/react";
import { useProducts, useAddProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/product.hook";
import { useCategories } from "@/hooks/category.hook";

const ProductList = () => {
  const { data: products, isLoading } = useProducts();
  const { data: categories, isLoading: categoryIsLoading } = useCategories();

  const addProductMutation = useAddProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    images: [] as File[],
    existingImages: [] as string[], // Store URLs of existing images
    category: "",
    gender: "", // New field for gender
  });
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const combinedImages = [...formData.existingImages, ...files.map((file) => URL.createObjectURL(file))];

    // Limit total images to 5
    if (combinedImages.length > 5) {
      alert("You can upload up to 5 images only.");
      return;
    }

    setFormData((prev) => ({ ...prev, images: files }));
    setPreviewImages(combinedImages);
  };

  const openModal = (product?: any) => {
    if (product) {
      setEditMode(true);
      setEditProductId(product._id);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stockQuantity: product.stockQuantity.toString(),
        images: [],
        existingImages: product.images || [],
        category: product.category?._id || "",
        gender: product.gender || "", // Set existing gender value
      });
      setPreviewImages(product.images || []);
    } else {
      setEditMode(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        images: [],
        existingImages: [],
        category: "",
        gender: "", // Reset gender field
      });
      setPreviewImages([]);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      name: "",
      description: "",
      price: "",
      stockQuantity: "",
      images: [],
      existingImages: [],
      category: "",
      gender: "", // Reset gender field
    });
    setPreviewImages([]);
    setEditProductId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const combinedImages = [...formData.existingImages, ...formData.images].slice(0, 5);
    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("price", formData.price);
    productData.append("stockQuantity", formData.stockQuantity);
    productData.append("category", formData.category);
    productData.append("gender", formData.gender); // Add gender to form data

    combinedImages.forEach((image, index) => {
      if (typeof image === "string") {
        productData.append(`existingImages[${index}]`, image); // Add existing URLs
      } else {
        productData.append("images", image); // Add new files
      }
    });

    if (isEditMode && editProductId) {
      await updateProductMutation.mutateAsync({ productId: editProductId, productData });
    } else {
      await addProductMutation.mutateAsync(productData);
    }
    closeModal();
  };

  if (isLoading || categoryIsLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 relative">
      <div className="flex justify-end mb-4">
        <Button color="success" size="sm" onClick={() => openModal()}>
          Add Product
        </Button>
      </div>

      <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border border-gray-300 p-2 text-left text-gray-700 dark:text-gray-300">Product Name</th>
            <th className="border border-gray-300 p-2 text-left text-gray-700 dark:text-gray-300">Description</th>
            <th className="border border-gray-300 p-2 text-left text-gray-700 dark:text-gray-300">Price</th>
            <th className="border border-gray-300 p-2 text-left text-gray-700 dark:text-gray-300">Stock Quantity</th>
            <th className="border border-gray-300 p-2 text-left text-gray-700 dark:text-gray-300">Category</th>
            <th className="border border-gray-300 p-2 text-left text-gray-700 dark:text-gray-300">Images</th>
            <th className="border border-gray-300 p-2 text-left text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: any) => (
            <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">{product.description}</td>
              <td className="border border-gray-300 p-2">${product.price}</td>
              <td className="border border-gray-300 p-2">{product.stockQuantity}</td>
              <td className="border border-gray-300 p-2">{product.category?.name || "Uncategorized"}</td>
              <td className="border border-gray-300 p-2 flex space-x-2">
                {product.images.map((image: string, index: number) => (
                  <Image key={index} src={image} alt="product image" width={50} height={50} className="rounded" />
                ))}
              </td>
              <td className="border border-gray-300 p-2">
                <div className="flex space-x-2">
                  <Button color="primary" size="sm" onClick={() => openModal(product)}>
                    Edit
                  </Button>
                  <Button color="danger" size="sm" onClick={() => deleteProductMutation.mutate(product._id)}>
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
              {isEditMode ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Product Name" name="name" fullWidth value={formData.name} onChange={handleInputChange} />
              <Textarea label="Description" name="description" fullWidth value={formData.description} onChange={handleInputChange} />
              <Input label="Price" name="price" fullWidth type="number" value={formData.price} onChange={handleInputChange} />
              <Input label="Stock Quantity" name="stockQuantity" fullWidth type="number" value={formData.stockQuantity} onChange={handleInputChange} />
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300">
                <option value="">Select Category</option>
                {categories.map((category: any) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Gender select input */}
              <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300">
                <option value="">Select Gender</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>

              <Input label="Product Images" name="images" type="file" multiple onChange={handleFileChange} />

              {/* Image previews remain unchanged */}
              
              <div className="mt-4 flex justify-end space-x-2">
                <Button color="danger" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" color="success">
                  {isEditMode ? "Update Product" : "Add Product"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;


