import React from 'react'
import ChangerExporter from '../ui/ChangerExporter';
import ExpenseForm from './ExpenseForm';



const PageCreateExpense = () => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Expenses", url: "/en/dashboard/expenses" },
  ];
  return (
    <section className="w-full space-y-10">
      <ChangerExporter
        links={links}
        active="Add New Expense"
      />
      <ExpenseForm/>
    </section>
  );
}

export default PageCreateExpense