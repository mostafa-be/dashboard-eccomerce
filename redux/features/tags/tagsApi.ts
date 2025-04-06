import { apiSlice } from "../api/apiSlice";

export const tagsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTag: builder.mutation({
      query: (data) => ({
        url: "create-tag",
        method: "POSt",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getTag: builder.query({
      query: ({ id }) => ({
        url: `get-tag/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllTags: builder.query({
      query: () => ({
        url: "get-tags",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editTag: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-tag/${id}`,
        method: "PUT",
        body: data,
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

export const {
  useGetAllTagsQuery,
  useGetTagQuery,
  useEditTagMutation,
  useDeleteTagMutation,
  useCreateTagMutation,
} = tagsApi;
