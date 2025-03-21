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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
export type User = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  functionality: string;
  isVerified: boolean;
  isBlocked: boolean;
  address: [];
  cart: [];
  wishlist: [];
  compared: [];
  orders: [];
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

export const columns: ColumnDef<User>[] = [
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
    header: "ID",
    cell: ({ row }) => {
      const id = row.original._id as string;
      return <div className="text-left font-medium">#{id.slice(4, 9)}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Full Name</div>,
    cell: ({ row }) => {
      const avatar = row.original.avatar;
      const name = row.original.name;

      return (
        <div className="flex gap-1 items-center ">
          <Avatar>
            {avatar ? (
              <AvatarImage src={avatar?.url} alt={name} />
            ) : (
              <AvatarFallback>{name.toUpperCase().slice(0, 1)}</AvatarFallback>
            )}
          </Avatar>
          <span className=" text-nowrap capitalize">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
    cell: ({ row }) => {
      const email = row.original.email;
      return <div className="text-left font-medium">{email}</div>;
    },
  },
  {
    accessorKey: "mobile",
    header: () => <div className="text-left text-nowrap">Mobile Nº</div>,
    cell: ({ row }) => {
      const mobile = row.original.mobile;
      return <div className="text-left font-medium">{mobile}</div>;
    },
  },
  {
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.role;
      return <div className="text-left font-medium">{role}</div>;
    },
  },
  /*{
    header: "Functionality",
    cell: ({ row }) => {
      const functionality = row.original.functionality;
      return <div className="text-left font-medium">{functionality}</div>;
    },
  },
  {
    header: "Blocked",
    cell: ({ row }) => {
      const isBlocked = row.original.isBlocked;
      return (
        <div
          className={` text-center font-medium ${
            isBlocked ? "text-red-600" : "text-green-500"
          }`}
        >
          {isBlocked ? "Yes" : "No"}
        </div>
      );
    },
  },
  {
    header: "Verified",
    cell: ({ row }) => {
      const isVerified = row.original.isVerified;
      return (
        <div
          className={` text-center font-medium ${
            isVerified ? "text-blue-600" : "text-green-500"
          }`}
        >
          {isVerified ? "Yes" : "No"}
        </div>
      );
    },
  },*/
  {
    accessorKey: "orders",
    header: () => <div className="text-left text-nowrap">Total Orders</div>,
    cell: ({ row }) => {
      const orders = row.original.orders;
      const totalOrders = orders.length || 0;
      return <div className="text-center font-medium">{totalOrders}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left text-nowrap">Created At</div>,
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;

      const formatted = formatDate(createdAt);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const user = row.original;
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
              onClick={() => navigator.clipboard.writeText(user._id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => redirect(`/en/dashboard/users/${user._id}`)}
            >
              View User
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2 text-red-600 hover:!text-red-800"
            >
              Delete User
              {/*             <AlertDeleteProduct _id={product._id} />
               */}{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
