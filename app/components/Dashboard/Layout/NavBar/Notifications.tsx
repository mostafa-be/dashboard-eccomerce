import { Notification } from "@/app/@types/types";
import { useGetAllNotificationsQuery } from "@/redux/features/notifications/notificationsApi";
import { ShoppingBag, Bell, CheckCircle2, AlertCircle, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

/**
 * Format a date/time string to a more readable format.
 * @param {string|Date} time - The ISO date string or Date object.
 * @returns {string} - Formatted time (e.g., "2 hours ago" or "2024-06-09 14:30").
 */
function formatTime(time?: string | Date) {
  if (!time) return "Just now";
  const date = typeof time === "string" ? new Date(time) : time;
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return date.toLocaleString();
}

/**
 * Notifications Component
 * Displays a bell icon. On click, shows a notification dropdown with real notifications.
 * Shows unread (bold) and read (normal) notifications.
 * Shows a toast when a new notification is received.
 */
const Notifications = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetAllNotificationsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const notifications: Notification[] = data?.notifications || [];

  // Track previous notifications length to detect new notifications
  const prevLength = useRef<number>(notifications.length);

  useEffect(() => {
    if (notifications.length > prevLength.current) {
      toast.success("You have a new notification!");
    }
    prevLength.current = notifications.length;
  }, [notifications.length]);

  // Check if there are unread notifications
  const hasUnread = notifications.some((notif) => notif.status === "unread");

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        type="button"
        aria-label="Show notifications"
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-transparent transition"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Bell size={20} className="text-gray-700/90 dark:text-white" />
        {hasUnread && (
          <span className="absolute top-2 right-3 p-1 rounded-full bg-red-500 border-2 border-white dark:border-black-100 animate-pulse"></span>
        )}
      </button>

      {/* Notification Dropdown */}
      {open && (
        <div className="w-72 absolute right-0 mt-2 rounded-lg bg-white dark:bg-black-100 shadow-lg border border-blue-100 dark:border-blue-900 z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Bell className="text-blue-600 dark:text-blue-400" size={20} />
              <span className="font-semibold text-blue-700 dark:text-blue-200 text-base">
                Notifications
              </span>
            </div>
            <button
              aria-label="Close notifications"
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={() => setOpen(false)}
            >
              <X size={16} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <ul className="w-full px-2 py-2 max-h-80 overflow-y-auto">
            {isLoading ? (
              <li className="py-4 text-center text-gray-500 dark:text-gray-400">
                Loading...
              </li>
            ) : notifications.length === 0 ? (
              <li className="py-4 text-center text-gray-500 dark:text-gray-400">
                No notifications.
              </li>
            ) : (
              notifications.map((notif) => (
                <li
                  key={notif._id}
                  className={`w-full flex items-center gap-3 py-3 px-3 hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer rounded transition ${
                    notif.status === "unread" ? "font-bold " : "font-normal"
                  }`}
                >
                  <div className="flex items-center">
                    {notif.title === "New Order" ? (
                      <ShoppingBag size={18} className="text-orange-600/70" />
                    ) : notif.title === "New Review Received" ? (
                      <CheckCircle2 size={18} className="text-green-600/70" />
                    ) : (
                      <AlertCircle size={18} className="text-red-600/70" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p
                      className={`text-sm text-gray-900 dark:text-gray-100 ${
                        notif.status === "unread"
                          ? "font-semibold"
                          : "font-normal"
                      }`}
                    >
                      {notif.title || "Notification"}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {notif.message || "You have a new notification."}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-600 mt-1">
                      {formatTime(notif.createdAt)}
                    </span>
                    <span
                      className={`text-[10px] mt-1 ${
                        notif.status === "unread"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-400 dark:text-gray-600"
                      }`}
                    >
                      {notif.status === "unread" ? "Unread" : "Read"}
                    </span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
