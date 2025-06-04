import React from "react";
import Heading from "@/utils/Heading";
import ExpensesPage from "@/app/components/Expenses/ExpensesPage";
import { JSX } from "react/jsx-runtime";

/**
 * Expenses Dashboard Page
 * Renders the expenses management interface in the dashboard.
 *
 * @returns {JSX.Element} The expenses page component.
 */
const Page = (): JSX.Element => {
  return (
    <>
      {/* Page Metadata */}
      <Heading
        title="Expenses | Dashboard"
        keywords="expenses, finance, dashboard, management"
        description="Manage and track your business expenses"
      />

      {/* Expenses Management Page */}
      <ExpensesPage />
    </>
  );
};

export default Page;
