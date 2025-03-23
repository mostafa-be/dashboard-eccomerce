"use client";

import { Ban } from "lucide-react";
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
  useGetAllCustomersQuery,
  useUnblockUserMutation,
  useBlockedUserMutation,
} from "@/redux/features/users/usersApi";
import toast from "react-hot-toast";
import { useEffect } from "react";

type AlertBlockedCustomerProps = {
  _id: string;
  isBlocked: boolean;
};

export function AlertBlockedCustomer({
  _id,
  isBlocked,
}: AlertBlockedCustomerProps) {
  const [
    blockUser,
    {
      isLoading: isLoadingBlock,
      isSuccess: isSuccessBlock,
      isError: isErrorBlock,
      error: errorBlock,
    },
  ] = useBlockedUserMutation();
  const [
    unblockUser,
    {
      isLoading: isLoadingUnblock,
      isSuccess: isSuccessUnblock,
      isError: isErrorUnblock,
      error: errorUnblock,
    },
  ] = useUnblockUserMutation();
  const { refetch } = useGetAllCustomersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccessBlock) {
      toast.success("Customer blocked successfully!");
      refetch();
    }
    if (isSuccessUnblock) {
      toast.success("Customer unblocked successfully!");
      refetch();
    }
    if (isErrorBlock && "data" in errorBlock) {
      const errorData = errorBlock as { data: { message: string } };
      toast.error(`Failed to block customer: ${errorData.data.message}`);
    }
    if (isErrorUnblock && "data" in errorUnblock) {
      const errorData = errorUnblock as { data: { message: string } };
      toast.error(`Failed to unblock customer: ${errorData.data.message}`);
    }
  }, [
    isSuccessBlock,
    isErrorBlock,
    errorBlock,
    refetch,
    isSuccessUnblock,
    isErrorUnblock,
    errorUnblock,
  ]);

  const handleBlockCustomer = async () => {
    if (isBlocked) {
      if (!isLoadingUnblock) {
        await unblockUser(_id);
      }
    } else if (!isBlocked) {
      if (!isLoadingBlock) {
        await blockUser(_id);
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className={`!p-0 !m-0 !shadow-none !outline-none !bg-transparent flex items-center gap-2 ${
            isBlocked
              ? "text-green-600 hover:!text-green-800"
              : "text-red-600 hover:!text-red-800"
          } border-none`}
        >
          <Ban />
          <span>{isBlocked ? "Unblock Customer" : "Block Customer"}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black-100">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to {isBlocked ? "unblock" : "block"} this
            customer?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isBlocked
              ? "Unblocking this customer will allow them to access their account again."
              : "Blocking this customer will restrict their access to their account."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black-100 dark:bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleBlockCustomer}
            className="bg-blue-650 hover:bg-blue-600 dark:text-white"
            disabled={isBlocked ? isLoadingUnblock : isLoadingBlock}
          >
            {isLoadingBlock || isLoadingUnblock
              ? isBlocked
                ? "Unblocking..."
                : "Blocking..."
              : isBlocked
              ? "Unblock"
              : "Block"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
