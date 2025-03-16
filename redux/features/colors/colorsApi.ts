import { apiSlice } from "../api/apiSlice";

export const colorsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createColor: builder.mutation({
      query: (data) => ({
        url: "create-color",
        method: "POSt",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllColors: builder.query({
      query: () => ({
        url: "get-colors",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteColor: builder.mutation({
      query: (id) => ({
        url: `delete-color/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllColorsQuery,useDeleteColorMutation,useCreateColorMutation } = colorsApi;
