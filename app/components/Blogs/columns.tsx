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

export type Blog = {
  _id: string;
  title: string;
  author: { name: string };
  category: { name: string };
  numViews: number;
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

export const columns: ColumnDef<Blog>[] = [
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
      <div className="text-left font-medium">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "author.name",
    header: () => <div className="text-left">Author</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.original.author.name}</div>
    ),
  },
  {
    accessorKey: "category.name",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.original.category.name}</div>
    ),
  },
  {
    accessorKey: "numViews",
    header: () => <div className="text-left">Views</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.original.numViews}</div>
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
      const blog = row.original;
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
              onClick={() => navigator.clipboard.writeText(blog._id)}
            >
              Copy Blog ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => redirect(`/en/dashboard/blogs/${blog._id}`)}
            >
              View Blog
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
