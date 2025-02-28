import React from "react";
import OrderItems from "./OrderItems";
import UserInfomation from "./UserInfomation";
import OrderInformation from "./OrderInformation";
import AddressShop from "./AddressShop";
import ExportChange from "./ExportChange";
import TableOrder from "./TableOrder";
import ChangeStatus from "./ChangeStatus";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface OrderPageProps {
  order: {
    _id: string;
    user: {
      name: string;
      email: string;
      mobile: string;
      avatar: {
        public_id: string;
        url: string;
      };
      role: string;
      functionality: string;
      isVerified: boolean;
      isBlocked: boolean;
      orders: [
        {
          totalPrice: number;
        }
      ];
    };
    method: string;
    paidAt: Date;
    shippingInfo: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    orderItems: [
      {
        product: {
          title: string;
        };
        color: {
          name: string;
          code: string;
        };
        size: {
          name: string;
        };
        quantity: number;
        price: number;
      }
    ];
    createdAt: Date;
    orderStatus: string;
    totalPrice: number;
  };
}

const OrderPage: React.FC<OrderPageProps> = ({ order }) => {
  const { orderItems, user, shippingInfo, _id, orderStatus } = order;

  const handleExportPDF = () => {
    const doc = new jsPDF();
    // Add company logo
    // const imgData = "data:image/png;base64,..."; // Replace with your logo's base64 string
    // doc.addImage(imgData, "PNG", 14, 10, 50, 20);
    doc.setFontSize(18);
    doc.text("Invoice", 14, 40);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, 14, 50);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 60);
    doc.text(`Customer: ${user.name}`, 14, 70);
    doc.text(`Email: ${user.email}`, 14, 80);
    doc.text(`Phone: ${user.mobile}`, 14, 90);
    doc.text(
      `Shipping Address: ${shippingInfo.street}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.postalCode}, ${shippingInfo.country}`,
      14,
      100
    );

    autoTable(doc, {
      startY: 110,
      head: [["Product", "Color", "Size", "Quantity", "Price"]],
      body: orderItems.map((item) => [
        item.product.title,
        item.color.name,
        item.size.name,
        item.quantity,
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price),
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    const totalAmount = orderItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const taxRate = 0.1; // Example tax rate of 10%
    const taxAmount = totalAmount * taxRate;
    const totalWithTax = totalAmount + taxAmount;

    const formattedTotalAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalAmount);

    const formattedTaxAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(taxAmount);

    const formattedTotalWithTax = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalWithTax);

    doc.text(
      `Subtotal: ${formattedTotalAmount}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.text(
      `Tax (10%): ${formattedTaxAmount}`,
      14,
      doc.lastAutoTable.finalY + 20
    );
    doc.text(
      `Total: ${formattedTotalWithTax}`,
      14,
      doc.lastAutoTable.finalY + 30
    );
    doc.text("Thank you for your purchase!", 14, doc.lastAutoTable.finalY + 40);
    doc.text(
      "For any queries, contact us at support@example.com",
      14,
      doc.lastAutoTable.finalY + 50
    );
    doc.text(
      "Visit our website: www.example.com",
      14,
      doc.lastAutoTable.finalY + 60
    );
    doc.save(`commercial_invoice_${order._id}.pdf`);
  };

  return (
    <section className="w-full ">
      <ExportChange onExportPDF={handleExportPDF} />
      <ChangeStatus orderId={_id} currentStatus={orderStatus} />
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
