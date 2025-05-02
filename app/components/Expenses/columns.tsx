"use client";

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
import { Checkbox } from "@/app/components/ui/checkbox";
import { redirect } from "next/navigation";
import { Expense } from "@/app/@types/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { AlertDeleteExpense } from "./AlertDeleteExpense";

/**
 * Formats a date string into a readable format.
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} - The formatted date string.
 */
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

/**
 * Formats a number as currency.
 *
 * @param {number} amount - The amount to format.
 * @returns {string} - The formatted currency string.
 */
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

/**
 * Column definitions for the Expenses table.
 * Each column defines how data is displayed and interacted with in the table.
 */
export const columns: ColumnDef<Expense>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "_id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => {
      const id = row.getValue("_id") as string;
      return <div className="text-left font-medium">#{id.slice(7, 10)}</div>;
    },
  },
  {
    accessorKey: "title",
    header: () => <div className="text-left">Title</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium line-clamp-2">
        {row.original.title}
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: () => <div className="text-left">Date</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {formatDate(row.getValue("date"))}
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: () => <div className="text-left">Created By</div>,
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            {user?.avatar?.url ? (
              <AvatarImage src={user.avatar.url} alt={user.name} />
            ) : (
              <AvatarFallback>
                {user?.name?.slice(0, 1).toUpperCase() || "?"}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white">
              {user?.name || "N/A"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email || "N/A"}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {formatCurrency(row.original.amount)}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium capitalize">
        {row.original.category}
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: () => <div className="text-left">Department</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium capitalize">
        {row.original.department}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;
      const statusStyles: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-800",
        APPROVED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-800",
        "IN REVIEW": "bg-blue-100 text-blue-800",
        "ON HOLD": "bg-orange-100 text-orange-800",
        REIMBURSED: "bg-purple-100 text-purple-800",
        CANCELLED: "bg-gray-100 text-gray-800",
        PROCESSING: "bg-teal-100 text-teal-800",
      };
      return (
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            statusStyles[status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const id = row.original._id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 outline-none">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-white dark:bg-black-100"
            align="end"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
              Copy Expense ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => redirect(`/en/dashboard/expenses/${id}`)}
            >
              View Expense
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => redirect(`/en/dashboard/expenses/edit/${id}`)}
            >
              Edit Expense
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="py-0"
            >
              <AlertDeleteExpense _id={id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
