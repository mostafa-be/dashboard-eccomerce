"use client";
import React from "react";
import ChangerExporter from "../ui/ChangerExporter";
import { useGetAllExpensesQuery } from "@/redux/features/expenses/expensesApi";
import { useGetAnalyticsExpensesQuery } from "@/redux/features/analytics/analyticsApi";
import LoadingList from "../Loader/LoadingList";
import LoadingError from "../Loader/LoadingError";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import StatisticsExpenses from "./StatisticsExpenses";
import { ButtonCreate } from "../ui/export";
import ListExpenses from "./ListExpenses";
import { Expense } from "@/app/@types/types";

const ExpensesPage = () => {
  const [period, setPeriod] = React.useState<string>("7d");

  // Fetch expenses data
  const {
    data: dataExpenses,
    isLoading: isLoadingExpenses,
    isError: isErrorExpenses,
    refetch: refetchExpenses,
  } = useGetAllExpensesQuery({}, { refetchOnMountOrArgChange: true });

  // Fetch analytics data
  const {
    data: dataAnalytics,
    isLoading: isLoadingAnalytics,
    isError: isErrorAnalytics,
    refetch: refetchAnalytics,
  } = useGetAnalyticsExpensesQuery(
    { period },
    { refetchOnMountOrArgChange: true }
  );

  const isLoading = isLoadingExpenses || isLoadingAnalytics;
  const isError = isErrorExpenses || isErrorAnalytics;

  if (isLoading) return <LoadingList />;
  if (isError)
    return (
      <LoadingError
        message="Error loading expenses or analytics data."
        onRetry={() => {
          refetchExpenses();
          refetchAnalytics();
        }}
      />
    );

  const expenses = dataExpenses?.data || [];
  const analytics = dataAnalytics?.analytics || {};

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    refetchAnalytics();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Expenses Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Title", "Amount", "Category", "Date", "Department", "Status"]],
      body: expenses.map((expense: Expense) => [
        expense.title,
        `$${expense.amount.toFixed(2)}`,
        expense.category,
        new Date(expense.date).toLocaleDateString(),
        expense.department,
        expense.status,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save("expenses_report.pdf");
  };


    const csvHeaders = [
      { label: "Title", key: "title" },
      { label: "Amount", key: "amount" },
      { label: "Category", key: "category" },
      { label: "Date", key: "date" },
      { label: "Department", key: "department" },
      { label: "Status", key: "status" },
    ];

    const csvData = expenses.map((expense: Expense) => ({
      title: expense.title,
      amount: `$${expense.amount.toFixed(2)}`,
      category: expense.category,
      date: new Date(expense.date).toLocaleDateString(),
      department: expense.department,
      status: expense.status,
    }));



  const links = [
    { name: "Home", url: "/" },
    { name: "Dashboard", url: "/en/dashboard" },
  ];

  const dataPeriod = {
    period,
    handlePeriodChange,
  };

  const dataPDF = {
    title: "Export PDF",
    handleExportPDF,
  };

  const dataCSV = {
    headers: csvHeaders,
    data: csvData,
    filename: "expenses_report.csv",
  };

  return (
    <section className="w-full space-y-10">
      {/* Export and Navigation Options */}
      <ChangerExporter
        links={links}
        active="Expenses"
        isPeriod
        dataPeriod={dataPeriod}
        isPDF
        dataPDF={dataPDF}
        isCSV
        dataCSV={dataCSV}
      />

      {/* Statistics Section */}
      <StatisticsExpenses period={period} analytics={analytics} />
      <ButtonCreate
        title="Add Expense"
        url="/en/dashboard/expenses/add-expense"
      />
      <ListExpenses data={expenses} />
    </section>
  );
};

export default ExpensesPage;
