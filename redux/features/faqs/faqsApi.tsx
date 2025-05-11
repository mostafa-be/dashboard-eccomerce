import { apiSlice } from "../api/apiSlice";

/**
 * faqsApi
 * Provides endpoints for managing FAQs, including creating, retrieving, editing, and deleting FAQs.
 */
export const faqsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Creates a new FAQ.
     * @param {object} data - The FAQ data to create.
     * @returns {object} The created FAQ.
     */
    createFaq: builder.mutation({
      query: (data) => ({
        url: "create-faq",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    /**
     * Retrieves a specific FAQ by ID.
     * @param {string} id - The ID of the FAQ to retrieve.
     * @returns {object} The retrieved FAQ.
     */
    getFaq: builder.query({
      query: ({ id }) => ({
        url: `get-faq/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    /**
     * Retrieves all FAQs.
     * @returns {Array} A list of all FAQs.
     */
    getAllFaqs: builder.query({
      query: () => ({
        url: "get-faqs",
        method: "GET",
        credentials: "include",
      }),
    }),

    /**
     * Edits an existing FAQ.
     * @param {string} id - The ID of the FAQ to edit.
     * @param {object} data - The updated FAQ data.
     * @returns {object} The updated FAQ.
     */
    editFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-faq/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    /**
     * Deletes an FAQ by ID.
     * @param {string} id - The ID of the FAQ to delete.
     * @returns {object} The deletion response.
     */
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `delete-faq/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateFaqMutation,
  useGetFaqQuery,
  useGetAllFaqsQuery,
  useEditFaqMutation,
  useDeleteFaqMutation,
} = faqsApi;
