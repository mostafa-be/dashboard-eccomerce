"use client";

import { Ban, User2 } from "lucide-react";
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
import { useState, useEffect } from "react";
import {
  //useChangeUserRoleMutation,
  useGetAllCustomersQuery,
  useUnblockUserMutation,
  useBlockedUserMutation,
  useChangeRoleUserMutation,
} from "@/redux/features/users/usersApi";
import toast from "react-hot-toast";

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

/**
 * AlertChangeRole
 * Confirmation dialog for changing a team member's role.
 */
type AlertChangeRoleProps = {
  _id: string;
};

export function AlertChangeRole({ _id }: AlertChangeRoleProps) {
  const [changeRoleUser, { isLoading, isSuccess, isError, error }] =
    useChangeRoleUserMutation();
  const { refetch } = useGetAllCustomersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [selectedRole, setSelectedRole] = useState("member");

  useEffect(() => {
    if (isSuccess) {
      toast.success("Role updated successfully!");
      refetch();
    }
    if (isError && "data" in error) {
      const errorData = error as { data: { message: string } };
      toast.error(errorData.data.message);
    }
  }, [isSuccess, isError, error, refetch]);

  const handleChangeRole = async () => {
    if (!isLoading) {
      await changeRoleUser({ _id, role: selectedRole });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="shadow-none !outline-none !bg-transparent flex items-center gap-2 text-blue-600 hover:!text-blue-800 border-none"
        >
          <User2 />
          <span>Change Role</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Change Member Role</AlertDialogTitle>
          <AlertDialogDescription>
            Select a new role for this member. This action will update their
            permissions immediately.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="member"
              checked={selectedRole === "member"}
              onChange={() => setSelectedRole("member")}
              className="accent-blue-600"
            />
            <span className="text-gray-700">Member</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={selectedRole === "admin"}
              onChange={() => setSelectedRole("admin")}
              className="accent-blue-600"
            />
            <span className="text-gray-700">Admin</span>
          </label>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black-100 dark:bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleChangeRole}
            className="bg-blue-650 hover:bg-blue-600 dark:text-white"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
