import { apiSlice } from "../api/apiSlice";

/**
 * policiesApi
 * Provides endpoints for managing policies, including creating, retrieving, editing, and deleting policies.
 */
export const policiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Creates a new policy.
     * @param {object} data - The policy data to create.
     * @returns {object} The created policy.
     */
    createPolicy: builder.mutation({
      query: (data) => ({
        url: "create-policy",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    /**
     * Retrieves a specific policy by type.
     * @param {string} type - The type of the policy to retrieve.
     * @returns {object} The retrieved policy.
     */
    getPolicyByType: builder.query({
      query: ({ type }) => ({
        url: `get-policy/${type}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    /**
     * Retrieves all policies.
     * @returns {Array} A list of all policies.
     */
    getAllPolicies: builder.query({
      query: () => ({
        url: "get-policies",
        method: "GET",
        credentials: "include",
      }),
    }),

    /**
     * Edits an existing policy.
     * @param {string} type - The type of the policy to edit.
     * @param {object} data - The updated policy data.
     * @returns {object} The updated policy.
     */
    editPolicy: builder.mutation({
      query: ({ type, data }) => ({
        url: `edit-policy/${type}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    /**
     * Deletes a policy by type.
     * @param {string} type - The type of the policy to delete.
     * @returns {object} The deletion response.
     */
    deletePolicyByType: builder.mutation({
      query: (type) => ({
        url: `delete-policy/${type}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreatePolicyMutation,
  useGetPolicyByTypeQuery,
  useGetAllPoliciesQuery,
  useEditPolicyMutation,
  useDeletePolicyByTypeMutation,
} = policiesApi;
