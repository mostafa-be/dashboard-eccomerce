import { Expense } from "@/app/@types/types";
import React from "react";
import ChangerExporter from "../ui/ChangerExporter";
import ExpenseForm from "../CreateExpense/ExpenseForm";

type Props = {
  expense: Expense;
  refetch: () => void;
};

const EditExpensePage = ({ expense, refetch }: Props) => {
  const links = [
    { name: "Home", url: "/en" },
    { name: "Expenses", url: "/en/dashboard" },
    { name: "Expenses", url: "/en/dashboard/expenses" },
  ];
  return (
    <section className="w-full space-y-10">
      <ChangerExporter links={links} active="Edit Expense" />
      <ExpenseForm isEdit expense={expense}  refetch={refetch}  />
    </section>
  );
};

export default EditExpensePage;
