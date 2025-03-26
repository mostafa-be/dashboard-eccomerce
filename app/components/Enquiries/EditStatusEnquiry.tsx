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
import {
  useEditEnquiryMutation,
  useGetAllEnquiriesQuery,
} from "@/redux/features/enquiries/enquiriesApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type EditStatusEnquiryProps = {
  enquiry: {
    _id: string;
    status: string;
  };
};

export function EditStatusEnquiry({ enquiry }: EditStatusEnquiryProps) {
  const [status, setStatus] = useState(enquiry.status);
  const [editEnquiry, { isLoading }] = useEditEnquiryMutation();
  const { refetch } = useGetAllEnquiriesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const handleUpdateStatus = async () => {
    try {
      const data = { status: status };
      await editEnquiry({ id: enquiry._id, data }).unwrap();
      toast.success("Enquiry status updated successfully!");
      refetch();
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to update status.";
      toast.error(errorMessage);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="!p-0 !m-0 !shadow-none !outline-none !bg-transparent flex items-center gap-2 text-blue-600 hover:!text-blue-800 border-none"
        >
          Edit Status
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Enquiry Status</AlertDialogTitle>
          <AlertDialogDescription>
            Select a new status for this enquiry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mt-4">
          <Select value={status} onValueChange={(value) => setStatus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="dark:bg-black-200">
              <SelectItem value="Submitted">Submitted</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black-100 dark:bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleUpdateStatus}
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
