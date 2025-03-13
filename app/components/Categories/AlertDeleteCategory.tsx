"use client";
import { Trash2 } from "lucide-react";
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
import { Button } from "../ui/button";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/features/categories/categoriesApi";
import toast from "react-hot-toast";
import { useEffect } from "react";

type AlertDeleteCategoryProps = {
  _id: string;
};

export function AlertDeleteCategory({ _id }: AlertDeleteCategoryProps) {
  const [deleteCategory, { isLoading, isSuccess, isError, error }] =
    useDeleteCategoryMutation();
  const { refetch } = useGetAllCategoriesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category deleted successfully!");
      refetch();
    }

    if (isError) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      } else {
        toast.error("Failed to delete category.");
      }
    }
  }, [isSuccess, isError, error, refetch]);

  const handleDeleteCategory = async () => {
    if (!isLoading) {
      await deleteCategory(_id);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="!p-0 !m-0 !shadow-none !outline-none !bg-transparent flex items-center gap-2 text-red-600 hover:!text-red-800 border-none"
        >
          <Trash2 />
          <span className="">Delete Category</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black-100">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this category?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this category will
            permanently remove it from our records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black-100 dark:bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteCategory}
            className="bg-blue-650 hover:bg-blue-600 dark:text-white"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
