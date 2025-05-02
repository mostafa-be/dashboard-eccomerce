import React from "react";
import { Expense } from "../../@types/types";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import { useEditExpenseMutation } from "@/redux/features/expenses/expensesApi";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import toast from "react-hot-toast";

type Props = {
  expense: Expense;
  refetch: () => void;
};

/**
 * ExpenseDetails Component
 * Displays detailed information about an expense in a card layout.
 *
 * @param {Props} props - The props for the component.
 * @param {Expense} props.expense - The expense data to display.
 */
const ExpenseDetails = ({ expense,  refetch
}: Props) => {
  const { _id, title, amount, category, date, status, notes } = expense;
  const [EditExpense, { isSuccess, isLoading, isError, error }] =
    useEditExpenseMutation();

  const handleStatusChange = async (newStatus: string) => {
    try {
      await EditExpense({ id: _id, data: { ...expense,status: newStatus } }).unwrap();
      refetch()
      toast.success("Status updated successfully!");
    } catch {
      toast.error("Failed to update status. Please try again.");
    }
  };

  // Handle success, error, and loading states
  if (isSuccess) {
    toast.success("Expense updated successfully!");
  }

  if (isError && error) {
    const errorMessage =
      "data" in error
        ? (error as { data: { message: string } }).data.message
        : "An error occurred.";
    toast.error(errorMessage);
  }

  return (
    <Card className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <HeaderCard>
        <TitleCard
          title="Expense Details"
          className="text-xl font-bold text-gray-800 dark:text-gray-100"
        />
      </HeaderCard>
      <CardContent className="w-full mt-5 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Amount:</strong> ${amount.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Category:</strong> {category}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Date:</strong> {new Date(date).toLocaleDateString()}
          </p>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Status:</strong>
            <Select
              value={status}
              onValueChange={(value) => handleStatusChange(value)}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-black-100">
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="IN REVIEW">In Review</SelectItem>
                <SelectItem value="ON HOLD">On Hold</SelectItem>
                <SelectItem value="REIMBURSED">Reimbursed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="PROCESSING">Processing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Note:</strong> {notes || "No additional notes provided."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseDetails;
