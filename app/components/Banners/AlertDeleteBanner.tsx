"use client";

import React, { useEffect } from "react";
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
import {
  useDeleteBannerMutation,
  useGetAllBannersQuery,
} from "@/redux/features/banners/bannersApi";

/**
 * AlertDeleteBanner Component
 * Displays a confirmation dialog for deleting a banner.
 *
 * @param {AlertDeleteBannerProps} props - The component props.
 * @param {string} props.bannerId - The ID of the banner to delete.
 * @returns {JSX.Element} The rendered alert delete banner component.
 */
type AlertDeleteBannerProps = {
  bannerId: string;
};

export function AlertDeleteBanner({ bannerId }: AlertDeleteBannerProps) {
  const [deleteBanner, { isLoading, isSuccess, isError, error }] =
    useDeleteBannerMutation();
  const { refetch } = useGetAllBannersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Banner deleted successfully!");
      refetch();
    }

    if (isError) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      } else {
        toast.error("Failed to delete banner.");
      }
    }
  }, [isSuccess, isError, error, refetch]);

  /**
   * Handles the deletion of the banner.
   * Calls the deleteBanner mutation with the provided banner ID.
   */
  const handleDeleteBanner = async () => {
    if (!isLoading) {
      await deleteBanner(bannerId);
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
          <span>Delete Banner</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black-100">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this banner?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this banner will permanently
            remove it from our records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black-100 dark:bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteBanner}
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
