"use client";

import { User } from "@/app/@types/types";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { AlertChangeRole } from "./AlertChangeRole";
import { AlertDeleteMember } from "./AlertDeleteMember";
import { BadgeCheck } from "lucide-react";

// Utility: Format date for display
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

/**
 * Table columns definition for Team Members.
 * Includes avatar, name, email, mobile, role, orders, created date, and actions.
 */
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Full Name</div>,
    cell: ({ row }) => {
      const { avatar, name, isActive, isVerified } = row.original;
      return (
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Avatar className="w-8 h-8 bg-gray-100 dark:bg-gray-800">
              {avatar ? (
                <AvatarImage src={avatar.url} alt={name} />
              ) : (
                <AvatarFallback className="text-blue-700 dark:text-blue-300 bg-gray-200 dark:bg-gray-700">
                  {name?.toUpperCase().slice(0, 1) || "U"}
                </AvatarFallback>
              )}
            </Avatar>
            {isVerified && (
              <BadgeCheck
                className="absolute -top-2 -right-2 w-4 h-4 text-blue-500 dark:text-blue-400 bg-white dark:bg-black-100 rounded-full p-0.5 shadow"
                //title="Verified"
              />
            )}
          </div>
          <span className="capitalize font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1">
            {name}
          </span>
          {/* Online/Offline indicator */}
          <span
            className={`ml-2 inline-block w-2 h-2 rounded-full ${
              isActive ? "bg-green-500" : "bg-gray-400 dark:bg-gray-600"
            }`}
            title={isActive ? "Online" : "Offline"}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
    cell: ({ row }) => (
      <div className="text-left text-blue-700 dark:text-blue-300 font-medium">
        {row.original.email}
      </div>
    ),
  },
  {
    accessorKey: "mobile",
    header: () => <div className="text-left">Mobile Nº</div>,
    cell: ({ row }) => (
      <div className="text-left text-gray-700 dark:text-gray-300">
        {row.original.mobile}
      </div>
    ),
  },
  {
    header: "Role",
    cell: ({ row }) => (
      <span className="inline-block px-2 py-1 rounded bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-semibold capitalize">
        {row.original.role}
      </span>
    ),
  },
  {
    accessorKey: "orders",
    header: () => <div className="text-left">Total Orders</div>,
    cell: ({ row }) => (
      <div className="text-center font-semibold text-gray-800 dark:text-gray-200">
        {row.original.orders.length}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ row }) => (
      <div className="text-left text-gray-500 dark:text-gray-400">
        {formatDate(row.getValue("createdAt"))}
      </div>
    ),
  },
  {
    id: "action",
    header: () => <div className="text-center">Actions</div>,
    /**
     * Renders the actions dropdown for each user row.
     * Includes options to change role and delete member.
     */
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 outline-none">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 text-gray-700 dark:text-gray-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-white dark:bg-black-100 border border-gray-100 dark:border-gray-800"
            align="end"
          >
            <DropdownMenuLabel className="text-gray-700 dark:text-gray-200">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />
            {/* Change Role Action */}
            <DropdownMenuItem
              className="py-0 m-0 hover:bg-blue-50 dark:hover:bg-blue-900"
              onSelect={(e) => e.preventDefault()}
            >
              <AlertChangeRole _id={user._id} />
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />
            {/* Delete Member Action */}
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="py-0 m-0 hover:bg-red-50 dark:hover:bg-red-900"
            >
              <AlertDeleteMember _id={user._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
