import jsPDF from "jspdf";
import ChangerExporter from "../ui/ChangerExporter";
import { Expense } from "@/app/@types/types";
import CreateBy from "./CreateBy";
import ExpenseDetails from "./ExpenseDetails";

interface ExpensePageProps {
  expense: Expense;
  refetch: () => void;
}

/**
 * ExpensePage Component
 * Displays detailed information about an expense and provides an option to export an invoice.
 *
 * @param {ExpensePageProps} props - The props for the component.
 * @param {Expense} props.expense - The expense data.
 * @param {function} props.refetch - Function to refetch the expense data.
 */
const ExpensePage: React.FC<ExpensePageProps> = ({ expense, refetch }) => {
  const {
    _id,
    title,
    amount,
    category,
    department,
    status,
    notes,
    date,
    user,
  } = expense;
  const { name, email, role, functionality } = user || {};
  /**
   * Generates and downloads a professional PDF invoice for the expense.
   */
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header Section
    doc.setFontSize(24);
    doc.setTextColor("#333");
    doc.text("EXPENSE INVOICE", pageWidth / 2, 30, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor("#666");
    doc.text("Big Handling & Startup Inc.", 14, 50);
    doc.text("1234 Innovation Drive, Silicon Valley, CA 94043", 14, 60);
    doc.text("Phone: (123) 456-7890 | Email: support@startup.com", 14, 70);
    doc.text("Website: www.startup.com", 14, 80);

    // Divider
    doc.setDrawColor(200);
    doc.line(14, 90, pageWidth - 14, 90);

    // Expense Details
    doc.setFontSize(14);
    doc.setTextColor("#333");
    doc.text("Expense Details", 14, 105);
    doc.setFontSize(12);
    doc.setTextColor("#555");
    doc.text(`Expense ID: ${_id}`, 14, 115);
    doc.text(`Title: ${title}`, 14, 125);
    doc.text(`Category: ${category}`, 14, 135);
    doc.text(`Department: ${department || "N/A"}`, 14, 145);
    doc.text(`Amount: $${amount.toFixed(2)}`, 14, 155);
    doc.text(`Date: ${new Date(date).toLocaleDateString()}`, 14, 165);
    doc.text(`Status: ${status}`, 14, 175);
    doc.text(`Notes: ${notes || "No additional notes provided."}`, 14, 185);

    // User Details
    doc.setFontSize(14);
    doc.setTextColor("#333");
    doc.text("Created By", 14, 205);
    doc.setFontSize(12);
    doc.setTextColor("#555");
    doc.text(`Name: ${name || "N/A"}`, 14, 215);
    doc.text(`Email: ${email || "N/A"}`, 14, 225);
    doc.text(`Role: ${role || "N/A"}`, 14, 235);
    doc.text(`Function: ${functionality || "N/A"}`, 14, 245);

    // Divider
    doc.setDrawColor(200);
    doc.line(14, 260, pageWidth - 14, 260);

    // Summary Section
    doc.setFontSize(14);
    doc.setTextColor("#333");
    doc.text("Summary", 14, 275);
    doc.setFontSize(12);
    doc.setTextColor("#555");
    doc.text(`Total Amount: $${amount.toFixed(2)}`, 14, 285);

    // Footer Section
    const footerStartY = pageHeight - 30;
    doc.setFontSize(10);
    doc.setTextColor("#999");
    doc.text(
      "Thank you for managing your expenses with Big Handling & Startup Inc.",
      pageWidth / 2,
      footerStartY,
      { align: "center" }
    );
    doc.text(
      "For any queries, contact us at support@startup.com",
      pageWidth / 2,
      footerStartY + 10,
      { align: "center" }
    );
    doc.text(
      "Visit our website: www.startup.com",
      pageWidth / 2,
      footerStartY + 20,
      { align: "center" }
    );

    doc.save(`expense_invoice_${_id}.pdf`);
  };

  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Expenses", url: "/en/dashboard/expenses" },
  ];

  const dataPDF = {
    title: "Export Invoice",
    handleExportPDF,
  };

  return (
    <section className="w-full space-y-10">
      {/* Export and Navigation Options */}
      <ChangerExporter
        links={links}
        active="Expense Details"
        isPDF
        dataPDF={dataPDF}
        isCSV={false}
        isPeriod={false}
      />
      <div className="w-full grid md:grid-cols-2 gap-6">
        {/* Expense Details */}
        <ExpenseDetails expense={expense} refetch={refetch} />
        {/* Creae By Information */}
        <CreateBy user={user} />
      </div>
    </section>
  );
};

export default ExpensePage;
