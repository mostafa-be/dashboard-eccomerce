import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /*registerByAdmin: builder.mutation({
      query: (data) => ({
        url: "registration-by-admin",
        method: "POSt",
        body: data,
        credentials: "include" as const,
      }),
    }),
  updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: avatar,
        credentials: "include" as const,
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "updateUser",
        method: "PUT",
        body: { name },
        creadentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: `update-user-password`,
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),*/
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
    }) /*
    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "update-user-role",
        method: "PUT",
        body: { email, role },
        creadentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),*/,
  }),
});

export const {
  //useRegisterByAdminMutation,
  //useUpdateAvatarMutation,
  //useEditProfileMutation,
  //useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useGetAllCustomersQuery,
  //useUpdateUserRoleMutation,
  //useDeleteUserMutation,
} = userApi;
