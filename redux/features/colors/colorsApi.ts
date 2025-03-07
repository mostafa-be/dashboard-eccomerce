import { apiSlice } from "../api/apiSlice";

export const colorsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllColors: builder.query({
      query: () => ({
        url: "get-colors",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllColorsQuery } = colorsApi;
