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
  useDeleteEnquiryMutation,
  useGetAllEnquiriesQuery,
} from "@/redux/features/enquiries/enquiriesApi";

type AlertDeleteEnquiryProps = {
  _id: string;
};

export function AlertDeleteEnquiry({ _id }: AlertDeleteEnquiryProps) {
  const [deleteEnquiry, { isLoading, isSuccess, isError, error }] =
    useDeleteEnquiryMutation();
  const { refetch } = useGetAllEnquiriesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Enquiry deleted successfully!");
      refetch();
    }

    if (isError) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      } else {
        toast.error("Failed to delete enquiry.");
      }
    }
  }, [isSuccess, isError, error, refetch]);

  const handleDeleteEnquiry = async () => {
    if (!isLoading) {
      await deleteEnquiry(_id);
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
          <span>Delete Enquiry</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black-100">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this enquiry?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this enquiry will permanently
            remove it from our records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black-100 dark:bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteEnquiry}
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
