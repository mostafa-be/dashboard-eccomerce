import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../../ui/card";
import Link from "next/link";
import CardLastOrder from "./CardLastOrder";

const RecentAndSales = () => {
  const lastOrder: {
    id: string;
    customerName: string;
    totalAmount: number;
    date: string;
  }[] =[
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "02/01/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "01/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "01/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "01/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "01/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "01/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "01/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "01/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "01/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "01/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "01/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "06/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "08/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "01/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "08/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "07/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "06/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "06/02/2025",
    },
    {
      id: "1",
      customerName: "Mostafa Belkhiat",
      totalAmount: 100,
      date: "08/02/2025",
    },
  ];
  return (
    <Card className=" max-md:mt-5 md:col-span-4 lg:col-span-3 bg-white dark:bg-black-100 shadow rounded-lg px-5">
      <HeaderCard className="w-full h-[60px] flex items-center justify-between">
        <TitleCard
          className="text-lg font-[500] text-gray-900 dark:text-white"
          title="Recent Sales"
        />
        <Link
          href={`/en/dahboard/order`}
          className="text-sm text-orange-600 dark:text-orange-400 underline"
        >
          See More
        </Link>
      </HeaderCard>
      <CardContent className=" mb-1.5 overflow-y-auto w-full h-[380px] bg-transparent layout-scroll transition-all duration-300 transform ease-in-out">
        <div className="w-full flex flex-col pr-1">
          {lastOrder ? (
            lastOrder.map((order, index) => (
              <CardLastOrder key={index} index={index} order={order} />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-black text-xl dark:text-white">No result</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAndSales;
