import { Product, ProductsResponse } from "../../types/types";
import { baseApi } from "./baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, void>({
      query: () => "products",
    }),
    getProductById: builder.query<{ product: Product }, string>({
      query: (id) => `products/${id}`,
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: "products",
        method: "POST",
        body: product,
      }),
    }),
    updateProduct: builder.mutation<
      Product,
      { id: string; product: Partial<Product> }
    >({
      query: ({ id, product }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: product,
      }),
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
