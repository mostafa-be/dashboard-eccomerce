import { apiSlice } from "../api/apiSlice";

export const blogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: "create-blog",
        method: "POSt",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: "get-blogs",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-blog/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `delete-blog/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useEditBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;
