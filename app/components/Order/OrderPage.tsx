import React from "react";
import OrderItems from "./OrderItems";
import UserInfomation from "./UserInfomation";
import OrderInformation from "./OrderInformation";
import AddressShop from "./AddressShop";
import TableOrder from "./TableOrder";
import ChangeStatus from "./ChangeStatus";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ChangerExporter from "../ui/ChangerExporter";
import { Order } from "@/app/@types/types";

interface OrderPageProps {
  order: Order;
  refetch: () => void;
}

const OrderPage: React.FC<OrderPageProps> = ({ order, refetch }) => {
  const { orderItems, user, shippingInfo, _id, orderStatus, invoiceId } =
    (order && order) || {};

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header Section
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text("INVOICE", pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Company Name", 14, 30);
    doc.text("1234 Street Name, City, State, ZIP", 14, 35);
    doc.text("Phone: (123) 456-7890 | Email: support@example.com", 14, 40);
    doc.text("Website: www.example.com", 14, 45);

    // Divider
    doc.setDrawColor(200);
    doc.line(14, 50, pageWidth - 14, 50);

    // Order Details
    doc.setFontSize(12);
    doc.setTextColor(40);
    doc.text(`Order ID: ${invoiceId ? invoiceId : _id.slice(0, 8)}`, 14, 60);
    doc.text(
      `Order Date: ${new Date(order.createdAt).toLocaleDateString()}`,
      14,
      65
    );
    doc.text(`Order Status: ${order.orderStatus}`, 14, 70);

    // Customer Details
    doc.text("Customer Details:", 14, 80);
    doc.setFontSize(10);
    doc.text(`Name: ${user.name}`, 14, 85);
    doc.text(`Email: ${user.email}`, 14, 90);
    doc.text(`Phone: ${user.mobile}`, 14, 95);

    // Shipping Address
    doc.text("Shipping Address:", 14, 105);
    doc.setFontSize(10);
    doc.text(
      `${shippingInfo.street}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.postalCode}, ${shippingInfo.country}`,
      14,
      110
    );
    // Table Header
    autoTable(doc, {
      startY: 120,
      head: [["Product", "Color", "Size", "Quantity", "Price", "Total"]],
      body:
        orderItems &&
        orderItems.map((item) => [
          item.product.title,
          item.color.name,
          item.size.name,
          item.quantity,
          `$${item.price.toFixed(2)}`,
          `$${(item.quantity * item.price).toFixed(2)}`,
        ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      margin: { top: 10 },
    });

    // Summary Section
    const totalAmount = orderItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const taxRate = 0.1; // Example tax rate of 10%
    const taxAmount = totalAmount * taxRate;
    const totalWithTax = totalAmount + taxAmount;

    const formattedTotalAmount = `$${totalAmount.toFixed(2)}`;
    const formattedTaxAmount = `$${taxAmount.toFixed(2)}`;
    const formattedTotalWithTax = `$${totalWithTax.toFixed(2)}`;

    const summaryStartY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text("Summary:", 14, summaryStartY);
    doc.setFontSize(10);
    doc.text(`Subtotal: ${formattedTotalAmount}`, 14, summaryStartY + 5);
    doc.text(`Tax (10%): ${formattedTaxAmount}`, 14, summaryStartY + 10);
    doc.text(`Total: ${formattedTotalWithTax}`, 14, summaryStartY + 15);

    // Footer Section
    const footerStartY = pageHeight - 30;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for your purchase!", pageWidth / 2, footerStartY, {
      align: "center",
    });
    doc.text(
      "For any queries, contact us at support@example.com",
      pageWidth / 2,
      footerStartY + 5,
      { align: "center" }
    );
    doc.text(
      "Visit our website: www.example.com",
      pageWidth / 2,
      footerStartY + 10,
      {
        align: "center",
      }
    );

    doc.save(`invoice_${invoiceId ? invoiceId : _id.slice(0, 8)}.pdf`);
  };
  const links = [
    {
      name: "Home",
      url: "/en",
    },
    {
      name: "Dashboard",
      url: "/en/dashboard",
    },
    {
      name: "Orders",
      url: "/en/dashboard/orders",
    },
  ];
  const dataPDF = {
    title: "Invoice",
    handleExportPDF,
  } as { title: string; handleExportPDF: () => void };
  return (
    <section className="w-full ">
      <ChangerExporter
        links={links}
        active="Order Details"
        isPDF={true}
        dataPDF={dataPDF}
        isCSV={false}
        isPeriod={false}
      />
      <ChangeStatus
        orderId={_id}
        refetch={refetch}
        currentStatus={orderStatus}
      />
      <div className="w-full mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <UserInfomation user={user} />
        <OrderInformation order={order} />
        <AddressShop address={shippingInfo} />
      </div>
      <OrderItems orderItems={orderItems} />
      <TableOrder orderItems={orderItems} />
    </section>
  );
};

export default OrderPage;
