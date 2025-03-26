import { apiSlice } from "../api/apiSlice";

export const enquiriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEnquiries: builder.query({
      query: () => ({
        url: "get-enquiries",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getEnquiry: builder.query({
      query: ({ id }) => ({
        url: `get-enquiry/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editEnquiry: builder.mutation({
      query: (id) => ({
        url: `edit-enquiry/${id}`,
        method: "PUT",
        creadentials: "include" as const,
      }),
    }),
    deleteEnquiry: builder.mutation({
      query: (id) => ({
        url: `delete-enquiry/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllEnquiriesQuery,
  useGetEnquiryQuery,
  useEditEnquiryMutation,
  useDeleteEnquiryMutation,
} = enquiriesApi;
