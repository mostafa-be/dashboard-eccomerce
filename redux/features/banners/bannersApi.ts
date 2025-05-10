import { apiSlice } from "../api/apiSlice";

/**
 * bannersApi
 * Provides endpoints for managing banners, including creating, retrieving, editing, and deleting banners.
 */
export const bannersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Creates a new banner.
     * @param {object} data - The banner data to create.
     */
    createBanner: builder.mutation({
      query: (data) => ({
        url: "create-banner",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    /**
     * Retrieves a specific banner by ID.
     * @param {string} id - The ID of the banner to retrieve.
     */
    getBanner: builder.query({
      query: ({ id }) => ({
        url: `get-banner/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    /**
     * Retrieves all banners.
     */
    getAllBanners: builder.query({
      query: () => ({
        url: "get-banners",
        method: "GET",
        credentials: "include",
      }),
    }),

    /**
     * Edits an existing banner.
     * @param {string} id - The ID of the banner to edit.
     * @param {object} data - The updated banner data.
     */
    editBanner: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-banner/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    /**
     * Deletes an banner by ID.
     * @param {string} id - The ID of the banner to delete.
     */
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `delete-banner/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateBannerMutation,
  useGetBannerQuery,
  useGetAllBannersQuery,
  useEditBannerMutation,
  useDeleteBannerMutation,
} = bannersApi;
