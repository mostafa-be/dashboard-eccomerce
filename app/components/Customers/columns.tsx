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
import { AlertDeleteCustomer } from "./AlertDeleteCustomer";
import { AlertBlockedCustomer } from "./AlertBlockedCustomer";

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
      const id = row.original._id;
      return <div className="text-left font-medium">#{id.slice(4, 9)}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left">Full Name</div>,
    cell: ({ row }) => {
      const { avatar, name } = row.original;
      return (
        <div className="flex gap-1 items-center">
          <Avatar>
            {avatar ? (
              <AvatarImage src={avatar.url} alt={name} />
            ) : (
              <AvatarFallback>{name.toUpperCase().slice(0, 1)}</AvatarFallback>
            )}
          </Avatar>
          <span className="capitalize">{name}</span>
        </div>
      );
    },
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
    header: () => <div className="text-left">Mobile Nº</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.original.mobile}</div>
    ),
  },
  {
    header: "Role",
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.original.role}</div>
    ),
  },
  {
    accessorKey: "orders",
    header: () => <div className="text-left">Total Orders</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.original.orders.length}
      </div>
    ),
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
              Copy Customer ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => redirect(`/en/dashboard/customers/${user._id}`)}
            >
              View Customer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <AlertBlockedCustomer _id={user._id} isBlocked={user.isBlocked} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2 text-red-600 hover:!text-red-800"
            >
              <AlertDeleteCustomer _id={user._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
