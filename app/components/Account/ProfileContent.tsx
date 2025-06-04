"use client";
import { Order, User } from "@/app/@types/types";
import React from "react";
import { useSelector } from "react-redux";
import {
  BookOpen,
  CreditCard,
  Briefcase,
  MessageCircle,
  Star,
  UserCog,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";

/**
 * ProfileContent Component
 * Displays the user's profile information in a modern card layout,
 * including sections for "My Blog", "My Expenses", more options, and user functionality.
 */
const ProfileContent = () => {
  const { user } = useSelector(
    (state: {
      auth: {
        user: User;
      };
    }) => state.auth
  );
console.log("User data:", user);
  const router = useRouter();

  // Fetch all orders and filter by current user
  const { data: ordersData } = useGetAllOrdersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const myOrders =
    ordersData?.orders?.filter(
      (order: Order) => order.user?._id === user?._id
    ) || [];

  // Navigation handlers for profile actions
  const handleEditProfile = () => {
    router.push("/dashboard/account/profile/edit");
  };

  const handleSettings = () => {
    router.push("/dashboard/account/settings");
  };

  const handleGoToBlog = () => {
    router.push("/dashboard/account/blog");
  };

  const handleViewExpenses = () => {
    router.push("/dashboard/account/expenses");
  };

  const handleProjects = () => {
    router.push("/dashboard/account/projects");
  };

  const handleMessages = () => {
    router.push("/dashboard/account/messages");
  };

  const handleReviews = () => {
    router.push("/dashboard/account/reviews");
  };

  const handleAccountSettings = () => {
    router.push("/dashboard/account/settings");
  };

  // User functionality: logout, change password, view activity, etc.
  const handleLogout = () => {
    router.push("/logout");
  };

  const handleChangePassword = () => {
    router.push("/dashboard/account/change-password");
  };

  const handleViewActivity = () => {
    router.push("/dashboard/account/activity");
  };

  if (!user) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        No user information available.
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-black-100 rounded-2xl shadow-xl p-10 flex flex-col items-center gap-10">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-700 shadow-xl">
          <img
            src={user.avatar?.url || "/default-avatar.png"}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start gap-2">
          <h2 className="text-3xl font-extrabold text-blue-700 dark:text-blue-300">
            {user.name}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {user.email}
          </p>
          <span className="inline-block mt-1 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm capitalize font-semibold">
            {user.role}
          </span>
          <div className="flex gap-4 mt-4">
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
            <button
              className="px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-semibold transition"
              onClick={handleSettings}
            >
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* My Blog Section */}
        <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-6 flex flex-col items-center shadow hover:shadow-md transition">
          <BookOpen
            className="text-blue-600 dark:text-blue-400 mb-2"
            size={36}
          />
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-200 mb-1">
            My Blog
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            Share your thoughts, write articles, and manage your blog posts
            here.
          </p>
          <button
            className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition"
            onClick={handleGoToBlog}
          >
            Go to My Blog
          </button>
        </div>
        {/* My Expenses Section */}
        <div className="bg-green-50 dark:bg-green-950 rounded-xl p-6 flex flex-col items-center shadow hover:shadow-md transition">
          <CreditCard
            className="text-green-600 dark:text-green-400 mb-2"
            size={36}
          />
          <h3 className="text-xl font-bold text-green-700 dark:text-green-200 mb-1">
            My Expenses
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
            Track your spending, view expense reports, and manage your finances.
          </p>
          <button
            className="mt-4 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition"
            onClick={handleViewExpenses}
          >
            View Expenses
          </button>
        </div>
      </div>

      {/* More Options Section */}
      <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <button
          onClick={handleProjects}
          className="flex flex-col items-center bg-purple-50 dark:bg-purple-900 rounded-xl p-5 shadow hover:shadow-md hover:bg-purple-100 dark:hover:bg-purple-800 transition"
        >
          <Briefcase
            className="text-purple-600 dark:text-purple-400 mb-2"
            size={28}
          />
          <span className="text-sm font-semibold text-purple-700 dark:text-purple-200">
            Projects
          </span>
        </button>
        <button
          onClick={handleMessages}
          className="flex flex-col items-center bg-cyan-50 dark:bg-cyan-900 rounded-xl p-5 shadow hover:shadow-md hover:bg-cyan-100 dark:hover:bg-cyan-800 transition"
        >
          <MessageCircle
            className="text-cyan-600 dark:text-cyan-400 mb-2"
            size={28}
          />
          <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-200">
            Messages
          </span>
        </button>
        <button
          onClick={handleReviews}
          className="flex flex-col items-center bg-yellow-50 dark:bg-yellow-900 rounded-xl p-5 shadow hover:shadow-md hover:bg-yellow-100 dark:hover:bg-yellow-800 transition"
        >
          <Star
            className="text-yellow-600 dark:text-yellow-400 mb-2"
            size={28}
          />
          <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-200">
            Reviews
          </span>
        </button>
        <button
          onClick={handleAccountSettings}
          className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 rounded-xl p-5 shadow hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <UserCog
            className="text-gray-600 dark:text-gray-300 mb-2"
            size={28}
          />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Account
          </span>
        </button>
      </div>

      {/* User Functionality Section */}
      <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={handleChangePassword}
          className="flex flex-col items-center bg-indigo-50 dark:bg-indigo-900 rounded-xl p-5 shadow hover:shadow-md hover:bg-indigo-100 dark:hover:bg-indigo-800 transition"
        >
          <svg
            className="w-7 h-7 text-indigo-600 dark:text-indigo-400 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m0 0v2m0-2h2m-2 0H8m8-6V7a4 4 0 10-8 0v4m12 0H4a2 2 0 00-2 2v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-2-2z"
            />
          </svg>
          <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-200">
            Change Password
          </span>
        </button>
        <button
          onClick={handleViewActivity}
          className="flex flex-col items-center bg-pink-50 dark:bg-pink-900 rounded-xl p-5 shadow hover:shadow-md hover:bg-pink-100 dark:hover:bg-pink-800 transition"
        >
          <svg
            className="w-7 h-7 text-pink-600 dark:text-pink-400 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3v18h18M3 9h18M9 21V9"
            />
          </svg>
          <span className="text-sm font-semibold text-pink-700 dark:text-pink-200">
            Activity
          </span>
        </button>
        <button
          onClick={handleLogout}
          className="flex flex-col items-center bg-red-50 dark:bg-red-900 rounded-xl p-5 shadow hover:shadow-md hover:bg-red-100 dark:hover:bg-red-800 transition"
        >
          <svg
            className="w-7 h-7 text-red-600 dark:text-red-400 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
          <span className="text-sm font-semibold text-red-700 dark:text-red-200">
            Logout
          </span>
        </button>
      </div>

      {/* Additional Details */}
      <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 rounded-xl p-5 shadow">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            12
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Projects
          </span>
        </div>
        <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 rounded-xl p-5 shadow">
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
            $5,200
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Total Expenses
          </span>
        </div>
        <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 rounded-xl p-5 shadow">
          <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            4.8
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Rating
          </span>
        </div>
      </div>

      {/* Orders Created By Me */}
      <div className="w-full mt-10">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-3">
          Orders Created By Me
        </h3>
        {myOrders.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 text-center">
            You have not created any orders yet.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-800 rounded-lg overflow-hidden shadow">
            {myOrders.map((order: any) => (
              <li
                key={order._id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-950 transition"
              >
                <span className="font-mono text-blue-700 dark:text-blue-300">
                  #{order.invoiceId}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  Total:{" "}
                  <span className="font-semibold">
                    {order.totalPrice ? `$${order.totalPrice}` : "N/A"}
                  </span>
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Status: {order.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
