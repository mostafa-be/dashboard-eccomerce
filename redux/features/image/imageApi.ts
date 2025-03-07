import { apiSlice } from "../api/apiSlice";

export const imageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
        query: (data) => ({
            url: "upload-image",
            method: "POSt",
            body: data,
            credentials: "include" as const,
        }),
    }),
  }),
});

export const { useUploadImageMutation } = imageApi;
