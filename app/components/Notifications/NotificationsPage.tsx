"use client";

import React, { useState } from "react";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { Input } from "../ui/input";
import { Bell, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import ChangerExporter from "../ui/ChangerExporter";
import LoadingNotifications from "../Loader/LoadingNotifications";
import LoadingError from "../Loader/LoadingError";

type Notification = {
  title: string;
  message: string;
  createdAt: string;
  status: string;
  _id: string;
};

/**
 * NotificationsPage Component
 * Displays a list of notifications with search and status update functionality.
 */
const NotificationsPage = () => {
  const { data, isLoading, isError, refetch } = useGetAllNotificationsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  const [updateNotificationStatus] = useUpdateNotificationStatusMutation();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <LoadingNotifications />;
  if (isError)
    return (
      <LoadingError message="Error loading notifications" onRetry={refetch} />
    );

  const notifications = data?.notifications || [];

  const filteredNotifications = notifications.filter((notification:Notification) =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Handles toggling the status of a notification between "read" and "unread".
   *
   * @param {string} id - The ID of the notification.
   * @param {string} status - The new status of the notification.
   */
  const handleToggleStatus = async (id: string, status: string) => {
    try {
      await updateNotificationStatus({ id, data: { status } });
      toast.success(
        `Notification marked as ${status === "read" ? "Read" : "Unread"}!`
      );
      refetch();
    } catch {
      toast.error("Failed to update notification status.");
    }
  };

  const links = [
    { name: "Home", url: "/en/" },
    { name: "Dashboard", url: "/en/dashboard" },
  ];

  return (
    <section className="w-full">
      {/* Navigation and Export Options */}
      <ChangerExporter links={links} active="Notifications" />

      {/* Notifications List */}
      <Card className="w-full mt-10 bg-white dark:bg-black-100 shadow rounded-lg">
        <HeaderCard className="w-full p-5 flex items-center justify-between">
          <TitleCard
            title="Notifications"
            className="text-xl font-semibold text-black dark:text-white"
          />
          <Input
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </HeaderCard>
        <CardContent className="w-full p-5">
          {filteredNotifications.length > 0 ? (
            <ul className="space-y-4">
              {filteredNotifications.map((notification: Notification) => (
                <li
                  key={notification._id}
                  className={`p-4 rounded-lg shadow transition-all duration-300 ${
                    notification.status === "unread"
                      ? "bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell
                        size={20}
                        className={`${
                          notification.status === "unread"
                            ? "text-blue-500"
                            : "text-gray-500"
                        }`}
                      />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {notification.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {notification.status === "unread" ? (
                        <span title="Mark as Read">
                          <CheckCircle
                            size={20}
                            className="text-green-500 cursor-pointer hover:text-green-700"
                            onClick={() =>
                              handleToggleStatus(notification._id, "read")
                            }
                          />
                        </span>
                      ) : (
                        <span title="Mark as Unread">
                          <XCircle
                            size={20}
                            className="text-red-500 cursor-pointer hover:text-red-700"
                            onClick={() =>
                              handleToggleStatus(notification._id, "unread")
                            }
                          />
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    {notification.message}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(notification.createdAt))}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No notifications found.
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default NotificationsPage;
