import React from "react";
import PageCreateExpense from "@/app/components/CreateExpense/PageCreateExpense";
import Heading from "@/utils/Heading";
import { JSX } from "react/jsx-runtime";

/**
 * Add Expense Page
 * Renders the interface for adding a new expense.
 *
 * @returns {JSX.Element} The Add Expense page component.
 */
const Page = (): JSX.Element => {
  return (
    <>
      {/* Page Metadata */}
      <Heading
        title="Add Expense"
        keywords="Expense"
        description="Detailed view of an expense"
      />
      {/* Add Expense Form */}
      <PageCreateExpense />
    </>
  );
};

export default Page;
