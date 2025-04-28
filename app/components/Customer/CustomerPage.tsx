"use client";

import React from "react";
import CustomerCardProfile from "./CustomerCardProfile";
import CustomerCardInformation from "./CustomerCardInformation";
import { User } from "../Customers/columns";
import { Button } from "../ui/button";
import {
  useBlockedUserMutation,
  useUnblockUserMutation,
} from "@/redux/features/users/usersApi";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ChangerExporter from "../ui/ChangerExporter";
import { Order } from "../Orders/columns";

type CustomerPageProps = {
  user: User;
};

const CustomerPage = ({ user }: CustomerPageProps) => {
  const [blockUser, { isLoading: isBlocking }] = useBlockedUserMutation();
  const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();

  const handleBlock = async () => {
    if (!isBlocking) {
      try {
        await blockUser(user._id).unwrap();
        toast.success("Customer blocked successfully!");
      } catch (err: unknown) {
        const errorMessage =
          (err as { data?: { message?: string } })?.data?.message ||
          "Failed to block customer.";
        toast.error(errorMessage);
      }
    }
  };

  const handleUnblock = async () => {
    if (!isUnblocking) {
      try {
        await unblockUser(user._id).unwrap();
        toast.success("Customer unblocked successfully!");
      } catch (err: unknown) {
        const errorMessage =
          (err as { data?: { message?: string } })?.data?.message ||
          "Failed to unblock customer.";
        toast.error(errorMessage);
      }
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Customer Profile and Information", 14, 20);

    const customerDetails = [
      `Name: ${user.name}`,
      `Email: ${user.email}`,
      `Mobile: ${user.mobile}`,
      `Role: ${user.role}`,
      `Functionality: ${user.functionality}`,
      `Verified: ${user.isVerified ? "Yes" : "No"}`,
      `Blocked: ${user.isBlocked ? "Yes" : "No"}`,
    ];

    customerDetails.forEach((detail, index) => {
      doc.text(detail, 14, 30 + index * 10);
    });

    autoTable(doc, {
      startY: 100,
      head: [["Order ID", "Total Price"]],
      body: user.orders.map((order:Order) => [
        order._id,
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(order.totalPrice),
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    doc.save(`customer_${user._id}_profile.pdf`);
  };

  const links = [
    { name: "Home", url: "/en" },
    { name: "Dashboard", url: "/en/dashboard" },
    { name: "Customers", url: "/en/dashboard/customers" },
  ];

  const dataPDF = { title: "Export PDF", handleExportPDF };

  return (
    <section className="w-full">
      <ChangerExporter
        links={links}
        active="Customer Details"
        isPDF
        isCSV={false}
        isPeriod={false}
        dataPDF={dataPDF}
      />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
        <CustomerCardProfile user={user} />
        <CustomerCardInformation user={user} />
        <div className="w-full flex items-center justify-end gap-4">
          {user.isBlocked ? (
            <Button
              onClick={handleUnblock}
              disabled={isUnblocking}
              className="bg-green-600 hover:bg-green-500 text-white"
            >
              {isUnblocking ? "Unblocking..." : "Unblock Customer"}
            </Button>
          ) : (
            <Button
              onClick={handleBlock}
              disabled={isBlocking}
              className="bg-red-600 hover:bg-red-500 text-white"
            >
              {isBlocking ? "Blocking..." : "Block Customer"}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomerPage;
