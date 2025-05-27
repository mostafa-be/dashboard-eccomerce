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
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import {
  useDeleteUserMutation,
  useGetAllCustomersQuery,
} from "@/redux/features/users/usersApi";
import toast from "react-hot-toast";
import { useEffect } from "react";

/**
 * AlertDeleteMember
 * Confirmation dialog for deleting (blocking) a team member.
 */
type AlertDeleteMemberProps = {
  _id: string;
};

export function AlertDeleteMember({ _id }: AlertDeleteMemberProps) {
  const [deleteUser, { isLoading, isSuccess, isError, error }] =
    useDeleteUserMutation();
  const { refetch } = useGetAllCustomersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Member deleted successfully!");
      refetch();
    }
    if (isError && "data" in error) {
      const errorData = error as { data: { message: string } };
      toast.error(errorData.data.message);
    }
  }, [isSuccess, isError, error, refetch]);

  const handleDeleteMember = async () => {
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
          <span>Delete Member</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black-100">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this member?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this member will permanently
            remove them from your team.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black-100 dark:bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteMember}
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
