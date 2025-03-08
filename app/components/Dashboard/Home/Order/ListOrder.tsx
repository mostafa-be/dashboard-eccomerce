import {
  Card,
  CardContent,
  HeaderCard,
  TitleCard,
} from "@/app/components/ui/card";
import React from "react";
import { TableOrder } from "./TableOrder";
import { columns } from "./columns";
import Link from "next/link";

const ListOrder = () => {
  const data = [
    {
      _id: "12975",
      user: {
        name: "mostafa belkhiat",
        email: "string@example.com",
        whatsapp: "+212639039620",
      },
      method: "Stripe",
      paidAt: new Date("2025-02-01"),
      orderStatus: "Processing",

      totalPrice: 100,
    },
    {
      _id: "7998",

      user: {
        name: "mostafa belkhiat",
        email: "string@example.com",
        whatsapp: "+212639039620",
      },
      method: "Paypal",
      paidAt: "01.01.2025",
      orderStatus: "Shipped",

      totalPrice: 3578,
    },
    {
      _id: "127685",

      user: {
        name: "mostafa belkhiat",
        email: "string@example.com",
        whatsapp: "+212639039620",
      },
      method: "Paypal",
      paidAt: "01.01.2025",
      orderStatus: "ordered",

      totalPrice: 3578,
    },
    {
      _id: "127685",

      user: {
        name: "mostafa belkhiat",
        email: "string@example.com",
        whatsapp: "+212639039620",
      },
      method: "Paypal",
      paidAt: "01.01.2025",
      orderStatus: "Cancelled",

      totalPrice: 3578,
    },
    {
      _id: "127685",

      user: {
        name: "mostafa belkhiat",
        email: "string@example.com",
        whatsapp: "+212639039620",
      },
      method: "Paypal",
      paidAt: "01.01.2025",
      orderStatus: "Delivered",

      totalPrice: 3578,
    },
    {
      _id: "127685",

      user: {
        name: "mostafa belkhiat",
        email: "string@example.com",
        whatsapp: "+212639039620",
      },
      method: "Paypal",
      paidAt: "01.01.2025",
      orderStatus: "Delivered",

      totalPrice: 3578,
    },
  ];
  return (
    <Card className="max-md:mt-5 w-full px-5 py-5 col-span-9  bg-white dark:bg-black-100 shadow rounded-lg">
      <HeaderCard className="w-full  ">
        <div className="w-full flex items-center justify-between">
          <TitleCard title="List Order Overview" />
          <Link
            href="/en/dashboard/orders"
            className="text-sm text-orange-600 dark:text-orange-400 underline"
          >
            See More
          </Link>
        </div>
      </HeaderCard>
      <CardContent className="w-full mt-5 ">
        <TableOrder data={data} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default ListOrder;
