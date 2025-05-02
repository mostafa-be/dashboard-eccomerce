"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/utils/Heading";
import LoadingError from "@/app/components/Loader/LoadingError";
import LoadingList from "@/app/components/Loader/LoadingList";
import { useGetExpenseQuery } from "@/redux/features/expenses/expensesApi";
import EditExpensePage from "@/app/components/EditExpense/EditExpensePage";

type PageProps = {
  params: { id: string };
};

/**
 * Expense Details Page
 * Displays detailed information about a specific expense.
 *
 * @param {PageProps} props - The props for the page.
 * @param {object} props.params - The route parameters.
 * @param {string} props.params.id - The ID of the expense.
 */
const Page = ({ params }: PageProps) => {
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    })();
  }, [params]);

  const id = unwrappedParams?.id;

  // Fetch expense data
  const {
    data: dataExpense,
    isError,
    isLoading,
    refetch,
  } = useGetExpenseQuery({ id }, { refetchOnMountOrArgChange: true });

  // Handle loading state
  if (isLoading) {
    return <LoadingList order={true} />;
  }

  // Handle loading error
  if (isError) {
    return <LoadingError message="Error loading expense" onRetry={refetch} />;
  }

  // Handle empty data
  const expense = dataExpense?.data || {};

  return (
    <>
      <Heading
        title={`Edit Expense ${expense.user?.name }`}
        keywords="Expense"
        description="Detailed view of an expense"
      />
      <EditExpensePage expense={expense} refetch={refetch} />
    </>
  );
};

export default Page;
