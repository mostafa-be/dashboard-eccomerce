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
import { AlertDeleteProduct } from "./AlertDeleteProduct";
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

export const columns: ColumnDef<Product>[] = [
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
    header: () => <div className="text-left">ID Product</div>,
    cell: ({ row }) => {
      const id = row.getValue("_id") as string;
      return <div className="text-left font-medium">#{id.slice(4, 9)}</div>;
    },
  },
  {
    accessorKey: "title",
    header: () => <div className="text-left">Product Name</div>,
    cell: ({ row }) => {
      const product = row.original;
      return <div className="text-left font-medium">{product.title}</div>;
    },
  },
  {
    header: "Ratings",
    cell: ({ row }) => {
      const ratings = row.original.ratings;
      return (
        <div className="text-center font-medium">{ratings?.toFixed(2)}</div>
      );
    },
  },
  {
    header: "Brand",
    cell: ({ row }) => {
      const brand = row.original.brand?.name;
      return <div className="text-left font-medium">{brand}</div>;
    },
  },

  {
    header: "Collection",
    cell: ({ row }) => {
      const collection = row.original.collections?.name;
      return <div className="text-left font-medium">{collection}</div>;
    },
  },
  {
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.categories.name;
      return <div className="text-left font-medium">{category}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    header: "Stock",
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      return (
        <div
          className={` text-center font-medium ${
            quantity === 0 ? "text-red-600" : "text-green-500"
          }`}
        >
          {quantity}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left">Created At</div>,
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;

      const formatted = formatDate(createdAt);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const product = row.original;
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
              onClick={() => navigator.clipboard.writeText(product._id)}
            >
              Copy Product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => redirect(`/en/dashboard/products/${product._id}`)}
            >
              View Product
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                redirect(`/en/dashboard/products/edit/${product._id}`)
              }
            >
              Edit Product
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2 text-red-600 hover:!text-red-800"
            >
              <AlertDeleteProduct _id={product._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
