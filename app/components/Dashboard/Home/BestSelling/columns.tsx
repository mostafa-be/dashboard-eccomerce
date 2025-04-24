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
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";

export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  estimatedPrice: number;
  quantityOriginal: number;
  quantity: number;
  categories: {
    _id: string;
    name: string;
  };
  collections: {
    _id: string;
    name: string;
  };
  brand: {
    _id: string;
    name: string;
  };
  discount: number;
  date: Date;
  tags: [object];
  colors: [object];
  sizes: [object];
  images: [object];
  ratings?: number;
  purchases: number;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "_id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => {
      const id = row.getValue("_id") as string;
      return <div className="text-left font-medium">#{id.slice(4, 9)}</div>;
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="text-left font-medium line-clamp-2">
          {product.title}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "purchases",
    header: () => <div className="text-right">Purchases</div>,
    cell: ({ row }) => {
      const purchased = parseFloat(row.getValue("purchases"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(purchased);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">Stock</div>,
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("quantity"));

      return (
        <div className="w-full  flex items-center justify-end">
          {" "}
          <div
            className={`px-3 py-2 ${
              quantity > 0
                ? "bg-green-400/65 text-white"
                : "bg-red-400/65 text-white"
            } rounded-full`}
          >
            <span className="text-center text-nowrap text-sm font-medium">
              {quantity > 0 ? "in stock" : "Out of stock"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 !outline-none dark:bg-black-100"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-black-100" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product._id)}
            >
              Copy Product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Product details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
