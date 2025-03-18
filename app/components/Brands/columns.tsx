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
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import { AlertDeleteBrand } from "./AlertDeleteBrand";

export type Brand = {
  _id: string;
  name: string;
  logo: {
    url: string;
    public_id: string;
  };
  createdAt: Date;
  updatedAt: Date;
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

export const columns: ColumnDef<Brand>[] = [
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
    header: () => <div className="text-left">Brand Name</div>,
    cell: ({ row }) => {
      const name = row.original.name;
      const logo = row.original.logo;
      return (
        <div className="flex items-center gap-2">
          {logo ? (
            <Image
              src={logo.url}
              alt={name}
              className="w-8 h-8 object-cover rounded-md"
              width={32}
              height={32}
            />
          ) : (
            <Skeleton className="w-8 h-8 rounded-md" />
          )}
          <div className="text-left font-medium capitalize">{name}</div>
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
    accessorKey: "updatedAt",
    header: () => <div className="text-left">Updated At</div>,
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string;
      const formatted = formatDate(updatedAt);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const brand = row.original;
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
              onClick={() => navigator.clipboard.writeText(brand._id)}
            >
              Copy Brand ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                redirect(`/en/dashboard/products/brands/${brand._id}`)
              }
            >
              View Brand
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="flex items-center gap-2 text-red-600 hover:!text-red-800 py-0"
            >
              <AlertDeleteBrand _id={brand._id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
