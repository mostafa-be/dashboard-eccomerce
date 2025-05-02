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
  useDeleteExpenseMutation,
  useGetAllExpensesQuery,
} from "@/redux/features/expenses/expensesApi";

type AlertDeleteExpenseProps = {
  _id: string;
};

/**
 * AlertDeleteExpense Component
 * Displays a confirmation dialog for deleting an expense.
 *
 * @param {AlertDeleteExpenseProps} props - The props for the component.
 * @param {string} props._id - The ID of the expense to delete.
 */
export function AlertDeleteExpense({ _id }: AlertDeleteExpenseProps) {
  const [deleteExpense, { isLoading, isSuccess, isError, error }] =
    useDeleteExpenseMutation();
  const { refetch } = useGetAllExpensesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Expense deleted successfully!");
      refetch();
    }

    if (isError) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      } else {
        toast.error("Failed to delete expense.");
      }
    }
  }, [isSuccess, isError, error, refetch]);

  /**
   * Handles the deletion of an expense.
   */
  const handleDeleteExpense = async () => {
    if (!isLoading) {
      await deleteExpense(_id);
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
          <span>Delete Expense</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-black-100">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this expense?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting this expense will permanently
            remove it from our records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-black-100 dark:bg-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteExpense}
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
