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
  useDeleteUserMutation,
  useGetAllCustomersQuery,
} from "@/redux/features/users/usersApi";
import toast from "react-hot-toast";
import { useEffect } from "react";

type AlertDeleteCustomerProps = {
  _id: string;
};

export function AlertDeleteCustomer({ _id }: AlertDeleteCustomerProps) {
  const [deleteUser, { isLoading, isSuccess, isError, error }] =
    useDeleteUserMutation();
  const { refetch } = useGetAllCustomersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Customer deleted successfully!");
      refetch();
    }

    if (isError && "data" in error) {
      const errorData = error as { data: { message: string } };
      toast.error(errorData.data.message);
    }
  }, [isSuccess, isError, error, refetch]);

  const handleDeleteCustomer = async () => {
    if (!isLoading) {
      await deleteUser(_id);
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
          <span>Delete Customer</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black-100">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this customer?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this customer will
            permanently remove them from our records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black-100 dark:bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteCustomer}
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
