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
  }),
});

export const { useGetAllTagsQuery } = tagsApi;
