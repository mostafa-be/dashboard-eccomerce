import { apiSlice } from "../api/apiSlice";

export const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "create-category",
        method: "POSt",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getCategory: builder.query({
      query: ({ id }) => ({
        url: `get-category/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-category/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: "get-categories",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `delete-category/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
} = categoriesApi;
