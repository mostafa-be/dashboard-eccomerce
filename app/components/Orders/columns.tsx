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
import { ChevronsUpDown, MoreHorizontal, PhoneCall } from "lucide-react";

import { Checkbox } from "@/app/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { redirect } from "next/navigation";
export type Order = {
  _id: string;
  user: {
    name: string;
    email: string;
    mobile: string;
    password: string;
    avatar: {
      public_id: string;
      url: string;
    };
    role: string;
    functionality: string;
    isVerified: boolean;
    isBlocked: boolean;
    address: [object];
    cart: [
      {
        product: object;
        color: object;
        size: object;
        quantity: number;
        price: number;
      }
    ];
    wishlist: [object];
    compared: [object];
    orders: [object];
  };
  method: string;
  paidAt: Date;
  orderItems: [
    {
      product: object;
      color: object;
      size: object;
      quantity: number;
      price: number;
    }
  ];
  createdAt: Date;
  orderStatus: string;
  totalPrice: number;
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


export const columns: ColumnDef<Order>[] = [
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
    header: () => <div className="text-right">ID Order</div>,
    cell: ({ row }) => {
      const id = row.getValue("_id") as string;
      return <div className="text-right font-medium">#{id.slice(3, 9)}</div>;
    },
  },
  {
    header: "User Information",
    cell: ({ row }) => {
      const order = row.original;
      const avatar = order?.user.avatar?.url;
      return (
        <div className="flex items-center">
          <Avatar>
            {avatar ? (
              <AvatarImage
                src={order?.user?.avatar?.url}
                alt={order.user.name}
              />
            ) : (
              <AvatarFallback>
                {order.user.name.toUpperCase().slice(0, 1)}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="ml-2">
            <p className="text-sm font-medium">{order.user.name}</p>
            <p className="text-xs text-gray-500">{order.user.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    header: "WhatsApp",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex items-center">
          <a
            href={`https://api.whatsapp.com/send?phone=${order.user.mobile}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
            title={`Chat with ${order.user.name} on WhatsApp`}
          >
            <PhoneCall className="h-5 w-5" />
          </a>
          <p className="ml-2 text-xs font-medium">{order.user.mobile}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Total Price</div>,
    cell: ({ row }) => {
      const totalPrice = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalPrice);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "method",
    header: () => <div className="text-right">Method</div>,
    cell: ({ row }) => {
      const method = row.getValue("method") as string;

      return <div className="text-right font-medium">{method}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Created At</div>,
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;

      const formatted = formatDate(createdAt);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "paided",
    header: () => <div className="text-right">Paided</div>,
    cell: ({ row }) => {
      const paided = row.getValue("paided") as string;
      const formatted = formatDate(paided);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "paidAt",
    header: () => <div className="text-right">Paid At</div>,
    cell: ({ row }) => {
      const paidAt = row.getValue("paidAt") as string;

      const formatted = formatDate(paidAt);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" flex items-center justify-end hover:bg-transparent"
        >
          <span className="">Status</span>
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const orderStatus = row.getValue("orderStatus") as string;
      return (
        <div className="w-full  flex items-center justify-sart">
          {" "}
          <div
            className={`px-3 py-2 ${
              (orderStatus === "Delivered" && "bg-green-400/65 text-white") ||
              (orderStatus === "Processing" && "bg-yellow-400/65 text-white") ||
              (orderStatus === "Cancelled" && "bg-red-400/65 text-white") ||
              (orderStatus === "Shipped" && "bg-blue-400/65 text-white") ||
              "bg-gray-400/65 text-white"
            } rounded-full`}
          >
            <span className="text-center text-nowrap text-sm font-medium capitalize">
              {orderStatus}
            </span>
          </div>
        </div>
      );
    },
  },
  {id:"action",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 outline-none">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order._id)}
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => redirect(`/en/dashboard/orders/${order._id}`)}
            >
              View Order details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
