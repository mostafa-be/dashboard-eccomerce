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
import ExportAndchange from "./ExportAndchange";
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
      } catch (err: any) {
        const errorMessage = err?.data?.message || "Failed to block customer.";
        toast.error(errorMessage);
      }
    }
  };

  const handleUnblock = async () => {
    if (!isUnblocking) {
      try {
        await unblockUser(user._id).unwrap();
        toast.success("Customer unblocked successfully!");
      } catch (err: any) {
        const errorMessage =
          err?.data?.message || "Failed to unblock customer.";
        toast.error(errorMessage);
      }
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Customer Profile and Information", 14, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${user.name}`, 14, 30);
    doc.text(`Email: ${user.email}`, 14, 40);
    doc.text(`Mobile: ${user.mobile}`, 14, 50);
    doc.text(`Role: ${user.role}`, 14, 60);
    doc.text(`Functionality: ${user.functionality}`, 14, 70);
    doc.text(`Verified: ${user.isVerified ? "Yes" : "No"}`, 14, 80);
    doc.text(`Blocked: ${user.isBlocked ? "Yes" : "No"}`, 14, 90);

    autoTable(doc, {
      startY: 100,
      head: [["Order ID", "Total Price"]],
      body: user.orders.map((order: Order) => [
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

  return (
    <section className="w-full">
      <ExportAndchange handleExportPDF={handleExportPDF} />
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
