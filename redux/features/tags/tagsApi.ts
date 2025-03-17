import { apiSlice } from "../api/apiSlice";

export const tagsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query({
      query: () => ({
        url: "get-tags",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteTag: builder.mutation({
      query: (id) => ({
        url: `delete-tag/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllTagsQuery,useDeleteTagMutation } = tagsApi;
