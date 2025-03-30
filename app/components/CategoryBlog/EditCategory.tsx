"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import {
  useEditCategoryBlogMutation,
  useGetBlogCategoryQuery,
} from "@/redux/features/blogCategories/blogCategoriesApi";

type EditCategoryProps = {
  category: {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export function EditCategory({ category }: EditCategoryProps) {
  const { _id } = category;
  const [name, setName] = useState(category.name);
  const [editCategoryBlog, { isLoading }] = useEditCategoryBlogMutation();
  const { refetch } = useGetBlogCategoryQuery(
    { _id },
    { refetchOnMountOrArgChange: true }
  );

  const handleEditCategory = async () => {
    try {
      await editCategoryBlog({
        id: category._id,
        data: { name },
      }).unwrap();
      toast.success("Category updated successfully!");
      refetch();
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to update category.";
      toast.error(errorMessage);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="text-blue-600 hover:text-blue-800 border-none"
        >
          Edit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Category</AlertDialogTitle>
          <AlertDialogDescription>
            Update the category details below.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black-100 dark:bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleEditCategory}
            className="bg-blue-650 hover:bg-blue-600 dark:text-white"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
