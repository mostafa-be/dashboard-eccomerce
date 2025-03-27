import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: "get-all-notifications",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateNotificationStatus: builder.mutation({
      query: ({id}) => ({
        url: `update-notification-status/${id}`,
        method: "PUT",
        creadentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllNotificationsQuery,useUpdateNotificationStatusMutation } = userApi;
