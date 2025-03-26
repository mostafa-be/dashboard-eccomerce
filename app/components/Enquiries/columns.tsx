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
import { AlertDeleteEnquiry } from "./AlertDeleteEnquiry";

export type Enquiry = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  status: string;
  createdAt: Date;
};

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

export const columns: ColumnDef<Enquiry>[] = [
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
    accessorKey: "name",
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "mobile",
    header: () => <div className="text-left">Mobile</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.original.mobile}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;
      const statusStyles: Record<string, string> = {
        Submitted: "bg-blue-100 text-blue-800",
        Contacted: "bg-yellow-100 text-yellow-800",
        "In Progress": "bg-orange-100 text-orange-800",
        Resolved: "bg-green-100 text-green-800",
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
    accessorKey: "createdAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {formatDate(row.getValue("createdAt"))}
      </div>
    ),
  },
  {
    id: "action",
    cell: ({ row }) => {
      const enquiry = row.original;
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(enquiry._id)}
            >
              Copy Enquiry ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => redirect(`/en/dashboard/enquiries/${enquiry._id}`)}
            >
              View Enquiry
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2 text-red-600 hover:!text-red-800"
            >
              <AlertDeleteEnquiry _id={enquiry._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
