import { apiSlice } from "../api/apiSlice";

export const blogCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBlogCategory: builder.mutation({
      query: (data) => ({
        url: "blog/create-category",
        method: "POSt",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getBlogCategory: builder.query({
      query: ({ id }) => ({
        url: `blog/get-category/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllCategoriesBlog: builder.query({
      query: () => ({
        url: "blog/get-categories",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editCategoryBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `blog/edit-category/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteBlogCategory: builder.mutation({
      query: (id) => ({
        url: `blog/delete-category/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateBlogCategoryMutation,
  useGetBlogCategoryQuery,
  useGetAllCategoriesBlogQuery,
  useEditCategoryBlogMutation,
  useDeleteBlogCategoryMutation,
} = blogCategoriesApi;
