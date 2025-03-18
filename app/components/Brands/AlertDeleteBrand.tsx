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
import toast from "react-hot-toast";
import { useEffect } from "react";
import {
  useDeleteBrandMutation,
  useGetAllBrandsQuery,
} from "@/redux/features/brand/brandsApi";

type AlertDeleteBrandProps = {
  _id: string;
};

export function AlertDeleteBrand({ _id }: AlertDeleteBrandProps) {
  const [deleteBrand, { isLoading, isSuccess, isError, error }] =
    useDeleteBrandMutation();
  const { refetch } = useGetAllBrandsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Brand deleted successfully!");
      refetch();
    }

    if (isError) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      } else {
        toast.error("Failed to delete brand.");
      }
    }
  }, [isSuccess, isError, error, refetch]);

  const handleDeleteBrand = async () => {
    if (!isLoading) {
      await deleteBrand(_id);
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
          <span className="">Delete Brand</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black-100">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this brand?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this brand will permanently
            remove it from our records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black-100 dark:bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteBrand}
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
