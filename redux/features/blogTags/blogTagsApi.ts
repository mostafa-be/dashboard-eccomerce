import { apiSlice } from "../api/apiSlice";

export const blogTagsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBlogTag: builder.mutation({
      query: (data) => ({
        url: "blog/create-tag",
        method: "POSt",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllTagsBlog: builder.query({
      query: () => ({
        url: "blog/get-tags",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editTagBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `blog/edit-tag/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteBlogTag: builder.mutation({
      query: (id) => ({
        url: `blog/delete-tag/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateBlogTagMutation,
  useGetAllTagsBlogQuery,
  useEditTagBlogMutation,
  useDeleteBlogTagMutation,
} = blogTagsApi;
