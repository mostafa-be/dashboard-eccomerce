import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "get-all-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllCustomers: builder.query({
      query: () => ({
        url: "get-all-customers",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getUser: builder.query({
      query: ({ id }) => ({
        url: `get-user/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    blockedUser: builder.mutation({
      query: (id) => ({
        url: `block-user/${id}`,
        method: "PUT",
        creadentials: "include" as const,
      }),
    }),
    updateProfileUser: builder.mutation({
      query: (data) => ({
        url: `updateUser`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updateSettingsUser: builder.mutation({
      query: (data) => ({
        url: `update-user-settings`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updateSecurityUser: builder.mutation({
      query: (data) => ({
        url: `update-user-settings`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updatePrivacyUser: builder.mutation({
      query: (data) => ({
        url: `update-user-privacy`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updateNotificationOptionUser: builder.mutation({
      query: (data) => ({
        url: `update-notification-options`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    updatePasswordUser: builder.mutation({
      query: (data) => ({
        url: `update-user-password`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    unblockUser: builder.mutation({
      query: (id) => ({
        url: `unblock-user/${id}`,
        method: "PUT",
        creadentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateSettingsUserMutation,
  useGetAllUsersQuery,
  useGetAllCustomersQuery,
  useGetUserQuery,
  useUpdatePrivacyUserMutation,
  useUpdateProfileUserMutation,
  useUpdatePasswordUserMutation,
  useUpdateSecurityUserMutation,
  useUpdateNotificationOptionUserMutation,
  useBlockedUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
} = userApi;
